const jwt = require("jsonwebtoken");
const blackListTokenModel = require("../models/blackListToken-model");
const userModel = require("../models/user-model");

module.exports.userAuth = async (req, res, next) => {
	const token = req.cookies["accessToken"] || req.headers.authorization?.split(" ")[1];
	if(!token) {
		return res.status(401).json({error: "Unauthorized Access"});
	}

	try {
		const isBlackListed = await blackListTokenModel.findOne({token});
		if(isBlackListed) {
			return res.status(401).json({error: "Invalid access token"});
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
		const user = await userModel.findOne({_id: decoded.id});
		req.user = user;
		next();
	} catch (error) {
		res.status(401).json({error: "Invalid access token"});
	}
}