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
	let term = req.body.searchTerm ? req.body.searchTerm : '';

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

	if (term) {

		/* 검색
		* db.users.find({name: /a/})  //like '%a%'
		* db.users.find({name: /^pa/}) //like 'pa%'
		* db.users.find({name: /ro$/}) //like '%ro'
		* */
		// term = '/^'+term+'/i';
		// console.log(term);
		Product.find(findArgs)
			// .find({ $text: {$search: term}} )
			// .find({title: /`${term}`/})
			.find({"title": {'$regex': term}})     // 쌍라이크
			// .find({"title": {'$regex': new RegExp('^'+term, "i") }})
			.populate("writer")
			.skip(skip)
			.limit(limit)
			.exec((err, productInfo) => {
				if (err) res.status(400).json({success: false, err});
				res.status(200).json({success: true, productInfo, postSize: productInfo.length})
			});
	} else {
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
	}

});


router.get('/products_by_id', (req, res) => {


	// productId 를 이용해서 DB에서 productId 에 맞는 상품을 가져온다.
	let type = req.query.type;
	let productIds = req.query.id;

	if (type === "array") {
		/* id = 123123123,234234234,345345345 이거를
		* productIds = ['123123123', '234234234', '345345345'] 이런식으로 바주기
		* */
		let ids = req.query.id.split(',');
		productIds = ids.map(item => item);
	}

	Product.find({_id: {$in: productIds}})
		.populate('writer')
		.exec((err, product) => {
			if (err) res.status(400).json({success: false, err});
			res.status(200).send(product)
		});

});


module.exports = router;


