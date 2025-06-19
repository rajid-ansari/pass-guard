const express = require("express");
const { savePassword, getAllPasswords, deletePassword } = require("../controllers/password-controller");
const { userAuth } = require("../middlewares/auth-middleware");
const router = express.Router();


router.get("/my-passwords", userAuth, getAllPasswords)

router.post("/save", userAuth, savePassword)

router.get("/delete/:id", userAuth, deletePassword)

module.exports = router;