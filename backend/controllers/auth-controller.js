const blackListTokenModel = require("../models/blackListToken-model");
const userModel = require("../models/user-model");
const generateToken = require("../utils/generateToken");
const hashPassword = require("../utils/hashPassword");
const bcrypt = require("bcrypt");
const isValidEmail = require("../utils/isValidEmail");

// register user
module.exports.registerUser = async (req, res) => {
    const { fullname, email, password } = req.body;

    if (!fullname || fullname.length < 3) {
        return res
            .status(400)
            .json({ error: "fullname must be atleast 3 characters" });
    }
    if (!password || password.length < 8) {
        return res
            .status(400)
            .json({ error: "Password must be atleast 8 characters" });
    }

    if(!isValidEmail(email)) {
        return res.status(400).json({error: "Invalid email"});
    }

    try {
        const isAlreadyRegistered = await userModel.findOne({ email });
        if (isAlreadyRegistered) {
            return res
                .status(409)
                .json({ error: "This email is already registered" });
        }

        const hashedPassword = await hashPassword(password);

        const newUser = await userModel.create({
            fullname,
            email,
            password: hashedPassword,
        });

        const token = generateToken(newUser._id);
        if (token) {
            res.cookie("accessToken", token, {
                httpOnly: true,
                secure: false,
                sameSite: "Lax",
                maxAge: 60 * 60 * 1000, //1hour ----- need to change later
            });
            res.status(201).json({
                message: "Registered successfully",
                user: newUser,
            });
        }
    } catch (error) {
        console.log(`Register user :: ${error.message}`);
        res.status(500).json({ error: "Something went wrong, try again." });
    }
};

// login user
module.exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password)
        return res.status(400).json({ error: "both fields are required" });

    try {
        const user = await userModel.findOne({ email }).select("+password");
        if (!user)
            return res.status(404).json({ error: "Invalid email or password" });

        const isMatched = await bcrypt.compare(password, user.password);
        if (!isMatched)
            return res.status(404).json({ error: "Invalid email or password" });

        const token = generateToken(user._id);
        res.cookie("accessToken", token, {
            httpOnly: true,
            secure: false,
            sameSite: "Lax",
            maxAge: 60 * 60 * 1000, //1hour ----- need to change later
        });
        res.status(200).json({ message: "Logged in successfully", user });
    } catch (error) {
        console.log(`Login user :: ${error.message}`);
        res.status(404).json({ error: "Invalid email or password" });
    }
};

// logout user
module.exports.logoutUser = async (req, res) => {
    const token = req.cookies["accessToken"] || req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ error: "Unauthorize access" });
    }

    try {
        await blackListTokenModel.create({ token });

        res.clearCookie("accessToken");
        res.status(200).json({ message: "Logged out successfully." });
    } catch (error) {
        console.log(`logout user :: ${error.message}`);
        res.status(500).json({ error: "something went wrong, try again." });
    }
};

// user profile
module.exports.userProfile = async (req, res) => {
    try {
        const user = await userModel
            .findOne({ _id: req.userId })
            .populate("voult");
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ error: "profile not found" });
    }
};
