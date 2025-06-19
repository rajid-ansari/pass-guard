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
        const user = await userModel.findOne({ _id: req.userId });

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
        const allPasswords = await voultModel
            .find({ userId: req.userId })
            .populate("userId");
        res.status(200).json(allPasswords);
    } catch (error) {
        res.status(404).json({ error: "Error fetching passwords." });
    }
};

// password deletion
module.exports.deletePassword = async (req, res) => {
    const userId = req.userId;
    const passwordId = req.params.id;

    if (!passwordId) {
        return res.status(404).json({ error: "Id not found." });
    }

    try {
        const passwordDocument = await voultModel.findById(passwordId);

        if (passwordDocument.userId.toString() !== userId.toString()) {
            return res.status(403).json({
                error: "You don't have access to delete this password.",
            });
        }

        await voultModel.findByIdAndDelete(passwordId);

        await userModel.findByIdAndUpdate(userId, {
            $pull: { voult: passwordId },
        });

        res.status(200).json({ message: "Password deleted." });
    } catch (error) {
        res.status(500).json({ error: "Internal server error, try again." });
    }
};

// update password
module.exports.updatePassword = async (req, res) => {
    const userId = req.userId;
    const passwordId = req.params.id;
    const { site, username, password } = req.body;

    if (!site || !password) {
        return res
            .status(400)
            .json({ error: "site and password fields are mandatory." });
    }

    if (!passwordId) {
        return res.status(404).json({ error: "Password id not found." });
    }

    try {
        const passwordDocument = await voultModel.findById(passwordId);

        if (passwordDocument.userId.toString() !== userId.toString()) {
            return res.status(403).json({
                error: "You don't have access to update this password",
            });
        }
        console.log(password);
        const hashedPassword = await hashPassword(password);
        console.log(hashedPassword);

        await voultModel.findByIdAndUpdate(passwordId, {
            site,
            username,
            password: hashedPassword,
        });

        res.status(200).json({ message: "Password updated" });
    } catch (error) {
        console.log(`update password :: ${error.message}`);
        res.status(500).json({ error: "Internal server error, try again." });
    }
};
