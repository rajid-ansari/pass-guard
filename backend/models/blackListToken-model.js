const mongoose = require("mongoose");

const blackListTokenSchema = new mongoose.Schema(
    {
        token: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const BlackListToken = mongoose.model("BlackListToken", blackListTokenSchema);
module.exports = BlackListToken;
