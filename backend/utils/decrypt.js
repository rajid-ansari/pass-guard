const crypto = require("crypto");

const algorithm = "aes-256-cbc";
const key = Buffer.from(process.env.SECRET_ENCRYPTION_KEY, "hex");

const decryptPassword = (encryptedText, iv) => {
    const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(iv, "hex"));

    let decryptedText = decipher.update(encryptedText, "hex", "utf-8");
    decryptedText += decipher.final("utf-8");

    return decryptedText;
};

module.exports = decryptPassword;