const mongoose = require('mongoose');
const schema = mongoose.Schema;

const productSchema = mongoose.Schema({
	writer : {
		type: schema.Types.Object,
		ref: 'User'
	},
	title: {
		type: String,
		maxlength: 50
	},
	description: {
		type: String,
	},
	price: {
		type: Number,
		default: 0
	},
	images: {
		type: Array,
		default: []
	},
	sold: {
		type: Number,
		maxlength: 100,
		default: 0
	},
	views: {
		type: Number,
		default: 0
	},
}, {timestamp: true});

const Product = mongoose.model('Product', productSchema);

module.exports = { Product };