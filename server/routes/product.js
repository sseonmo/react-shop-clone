
const express = require('express');
const router = express.Router();
const multer  = require('multer');
const { Product } = require('../models/Product');


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

var upload = multer({ storage: storage }).single("file");


// fileupload
router.post("/image", (req, res) => {
	// 가져온 이미지 저장
	upload(req, res, err => {
		if(err) return res.json({ success: false, err});
		//res.req.file.path, res.req.file.filename =>파일이 저장 되고 난 후의 패스 및 파일이름
		return res.json({ success: true, filePath:res.req.file.path, fileName: res.req.file.filename});
	});
});

// 상품저장
router.post("/", (req, res) => {

	const product = new Product(req.body);

	product.save((err, doc) => {
		if(err) return res.status(400).json({ success: false, err});
		res.status(200).json({ success: true, doc});
	})

});



module.exports = router;
