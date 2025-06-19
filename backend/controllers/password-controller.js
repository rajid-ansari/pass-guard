const voultModel = require("../models/voult-model");
const userModel = require("../models/user-model");
const hashPassword = require("../utils/hashPassword");

// saving password
module.exports.savePassword = async (req, res) => {
    const { site, username, password } = req.body;

    if (!site || !password) {
        return res
            .status(400)
            .json({ error: "site and password fields are mandatory." });
    }

    try {
        const hashedPassword = await hashPassword(password);

        const newPassword = await voultModel.create({
            site,
            username,
            password: hashedPassword,
			userId: req.userId, //mapped user with voult
        });
		// now map voult back to user
		const user = await userModel.findOne({_id: req.userId})

		user.voult.push(newPassword._id);
		await user.save();

        res.status(201).json({ message: "Password saved" });
    } catch (error) {
        res.status(500).json({ error: "Something went wrong, try again." });
    }
};

// listing all paswords
module.exports.getAllPasswords = async (req, res) => {
    try {
        const allPasswords = await voultModel.find({userId: req.userId}).populate("userId");
        res.status(200).json(allPasswords);
    } catch (error) {
        res.status(404).json({ error: "Error fetching passwords" });
    }
};
