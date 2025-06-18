const express = require("express");
const { registerUser, loginUser, logoutUser, userProfile } = require("../controllers/auth-controller");
const { userAuth } = require("../middlewares/auth-middleware");
const router = express.Router();



router.get("/", (req, res) => {
	res.send("user page");
});

router.post("/register", registerUser);
router.post("/sign-in", loginUser);

router.get("/logout", userAuth, logoutUser);

router.get("/profile", userAuth, userProfile)

module.exports = router;