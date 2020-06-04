const express = require('express');
const router = express.Router();
const multer = require('multer');
const {Product} = require('../models/Product');


//=================================
//             Product
//=================================

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads/')
	},
	filename: function (req, file, cb) {
		cb(null, `${Date.now()}_${file.originalname}`)
	}
});

var upload = multer({storage: storage}).single("file");


// fileupload
router.post("/image", (req, res) => {
	// 가져온 이미지 저장
	upload(req, res, err => {
		if (err) return res.json({success: false, err});
		//res.req.file.path, res.req.file.filename =>파일이 저장 되고 난 후의 패스 및 파일이름
		return res.json({success: true, filePath: res.req.file.path, fileName: res.req.file.filename});
	});
});

// 상품저장
router.post("/", (req, res) => {
	const product = new Product(req.body);
	product.save((err, doc) => {
		if (err) return res.status(400).json({success: false, err});
		res.status(200).json({success: true, doc});
	})
});

// 상품가져오기
router.post("/products", (req, res) => {

	let skip = req.body.skip ? parseInt(req.body.skip) : 0;
	let limit = req.body.limit ? parseInt(req.body.limit) : 20;

	// 컬럼명을 맞춰서 find args로 던지면.. find가 되네..
	// req.body.filters = { continents: [1,3], price: [1,2,3,4,5] }
	let findArgs = {};
	for (let key in req.body.filters) {
		if (req.body.filters[key].length > 0) {

			if (key === 'price') {
				findArgs[key] = {
					$gte: req.body.filters[key][0],
					$lte: req.body.filters[key][1]
				};
			} else {
				findArgs[key] = req.body.filters[key];
			}
		}
	}
	console.log('findArgs', findArgs);
	// product collection에 들어잇는 모든 상품 정보를 가져오기
	// populate를 사용해서 ref에 해당 ObjectId가 속해있는 모델에 해당하는 값과 객체로 치환해주는 역할을 한다.
	Product.find(findArgs)
		.populate("writer")
		.skip(skip)
		.limit(limit)
		.exec((err, productInfo) => {
			if (err) res.status(400).json({success: false, err});

			res.status(200).json({success: true, productInfo, postSize: productInfo.length})
		});
});


module.exports = router;
