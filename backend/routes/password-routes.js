const express = require("express");
const { savePassword, getAllPasswords } = require("../controllers/password-controller");
const { userAuth } = require("../middlewares/auth-middleware");
const router = express.Router();


router.get("/my-passwords", userAuth, getAllPasswords)

router.post("/save", userAuth, savePassword)

module.exports = router;