const express = require('express');
const router = express.Router();
const {User} = require("../models/User");

const {auth} = require("../middleware/auth");

//=================================
//             User
//=================================

router.get("/auth", auth, (req, res) => {
	res.status(200).json({
		_id: req.user._id,
		isAdmin: req.user.role === 0 ? false : true,
		isAuth: true,
		email: req.user.email,
		name: req.user.name,
		lastname: req.user.lastname,
		role: req.user.role,
		image: req.user.image,
        cart: req.user.cart,
        history: req.user.history,
	});
});

router.post("/register", (req, res) => {

	const user = new User(req.body);

	user.save((err, doc) => {
		if (err) return res.json({success: false, err});
		return res.status(200).json({
			success: true
		});
	});
});

router.post("/login", (req, res) => {
	User.findOne({email: req.body.email}, (err, user) => {
		if (!user)
			return res.json({
				loginSuccess: false,
				message: "Auth failed, email not found"
			});

		user.comparePassword(req.body.password, (err, isMatch) => {
			if (!isMatch)
				return res.json({loginSuccess: false, message: "Wrong password"});

			user.generateToken((err, user) => {
				if (err) return res.status(400).send(err);
				res.cookie("w_authExp", user.tokenExp);
				res
					.cookie("w_auth", user.token)
					.status(200)
					.json({
						loginSuccess: true, userId: user._id
					});
			});
		});
	});
});

router.get("/logout", auth, (req, res) => {
	User.findOneAndUpdate({_id: req.user._id}, {token: "", tokenExp: ""}, (err, doc) => {
		if (err) return res.json({success: false, err});
		return res.status(200).send({
			success: true
		});
	});
});

router.post("/addToCart", auth, (req, res) => {

	// 먼저 user collect 의 정보를 가져오기
	User.findOne({_id: req.user._id},
		(err, userInfo) => {
	        console.log(userInfo);
            // res.json({success: true});
			// 가져온 정보에서 카트에서 넣으려하는 상품이 이미 들어 있는지  check
			let duplicate = false;
			userInfo.cart.forEach((item) => {
                if (item.id === req.body.productId) {
                    duplicate = true;
                }
            });
				if (duplicate) {
					// 있다며 quantity + 1
					User.findOneAndUpdate({_id: req.user._id, "cart.id": req.body.productId},
						{$inc: {"cart.$.quantity": 1}},
						{new: true}, // update 된 정보를 받기위해서 new: true 가 필요하다. 즉 밑에 userInfo 를 받기위해서이다.
						(err, userInfo) => {
							if (err) return res.status(200).json({success: false});
							return res.status(200).send(userInfo.cart);
						}
					)
				} else {
					// 없다면 상품을 카트에 담는다.
					User.findOneAndUpdate({_id: req.user._id},
						{
							$push: {
								cart: {
									id: req.body.productId,
									quantity: 1,
									date: Date.now()
								}
							}
						},
						{new: true},
						(err, userInfo) => {
							if (err) res.status(200).json({success: false});
							return res.status(200).send(userInfo.cart);
						}
					)
				}
		})


});

module.exports = router;
