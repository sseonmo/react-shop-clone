const mongoose = require('mongoose');
const schema = mongoose.Schema;

const paymentSchema = mongoose.Schema({
	user: {
		type: Array,
		default: []
	},
	data:{
		type: Array,
		default: []
	},
	product: {
		type: Array,
		default: []
	}

}, {timestamp: true});


const Payyment = mongoose.model('Payment', paymentSchema);

module.exports = { Payyment };