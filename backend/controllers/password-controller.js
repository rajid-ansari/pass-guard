const voultModel = require("../models/voult-model");
const userModel = require("../models/user-model");
const hashPassword = require("../utils/hashPassword");
const encryptPassword = require("../utils/encrypt");
const decryptPassword = require("../utils/decrypt");

// saving password
module.exports.savePassword = async (req, res) => {
    const { site, username, password } = req.body;

    if (!site || !password) {
        return res
            .status(400)
            .json({ error: "site and password fields are mandatory." });
    }

    try {
        const { encryptedData, iv } = encryptPassword(password);

        const newPassword = await voultModel.create({
            site,
            username,
            password: encryptedData,
            userId: req.userId, //mapped user with voult
            iv,
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

// listing all paswords of logged in user
module.exports.getAllPasswords = async (req, res) => {
    try {
        const voults = await voultModel
            .find({ userId: req.userId })
            .populate("userId");

        const decryptedVoults = voults.map((voult) => {
            const plainObj = voult.toObject();
            plainObj.password = decryptPassword(plainObj.password, plainObj.iv);

            return plainObj;
        });

        res.status(200).json(decryptedVoults);
    } catch (error) {
        console.log(`fetching password :: ${error.message}`);
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

        const { encryptedData, iv } = encryptPassword(password);

        await voultModel.findByIdAndUpdate(passwordId, {
            site,
            username,
            password: encryptPassword,
            iv,
        });

        res.status(200).json({ message: "Password updated" });
    } catch (error) {
        console.log(`update password :: ${error.message}`);
        res.status(500).json({ error: "Internal server error, try again." });
    }
};
