const express = require("express");
const { registerUser, loginUser, logoutUser } = require("../controllers/auth-controller");
const router = express.Router();



router.get("/", (req, res) => {
	res.send("user page");
});

router.post("/register", registerUser)
router.post("/sign-in", loginUser)

router.get("/logout", logoutUser)


module.exports = router;