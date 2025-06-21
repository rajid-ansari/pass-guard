const mongoose = require("mongoose");

const voultSchema = new mongoose.Schema({
	site: {
		type: String,
		required: true,
		trim: true,
	},

	password: {
		type: String,
		required: true,
	},

	username: {
		type: String,
	},

	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},

	iv: {
		type: String,
		required: true,
	}

}, {timestamps: true});

const Voult = mongoose.model("Voult", voultSchema);
module.exports = Voult;