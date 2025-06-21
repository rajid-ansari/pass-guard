const crypto = require("crypto");

const algorithm = "aes-256-cbc";
const key = Buffer.from(process.env.SECRET_ENCRYPTION_KEY, "hex");

const encryptPassword = (password) => {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, key, iv);

    let encrypted = cipher.update(password, "utf-8", "hex");
    encrypted += cipher.final("hex");

    return {
        encryptedData: encrypted,
        iv: iv.toString("hex"),
    };
};

module.exports = encryptPassword;
