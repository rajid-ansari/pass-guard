const express = require("express");
const {
    savePassword,
    getAllPasswords,
    deletePassword,
    updatePassword,
} = require("../controllers/password-controller");
const { userAuth } = require("../middlewares/auth-middleware");
const router = express.Router();


router.get("/my-passwords", userAuth, getAllPasswords);

router.post("/save", userAuth, savePassword);

router.get("/delete/:id", userAuth, deletePassword);

router.post("/update/:id", userAuth, updatePassword);

module.exports = router;
