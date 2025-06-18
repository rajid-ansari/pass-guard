const userModel = require("../models/user-model");
const generateToken = require("../utils/generateToken");
const hashPassword = require("../utils/hashPassword");
const bcrypt = require("bcrypt");

// register user
module.exports.registerUser = async (req, res) => {
    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
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

        const token = generateToken(newUser);
        if (token) {
            res.cookie("authToken", token);
            res.status(201).json({ message: "Registered successfully" });
        }
    } catch (error) {
        console.log(`Register user :: ${error.message}`);
        res.status(400).json({ error: "All fields are required" });
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

        const token = generateToken(user);
        res.cookie("authToken", token);
        res.status(200).json({ message: "Logged in successfully" });
    } catch (error) {
        console.log(`Login user :: ${error.message}`);
        res.status(404).json({ error: "Invalid email or password" });
    }
};

// logout user
module.exports.logoutUser = async (req, res) => {
    try {
        res.clearCookie("authToken");
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log(`logout user :: ${error.message}`);
        res.status(500).json({ error: "something went wrong, try again" });
    }
};
