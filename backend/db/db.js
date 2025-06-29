const mongoose = require("mongoose");

function connectDB() {
    mongoose
        .connect(`${process.env.MONGO_URI}`)
        .then(() => {
            console.log("Connected to DB.");
        })
        .catch((err) => {
            console.log(`DB Error :: ${err.message}`);
        });
}

module.exports = connectDB;
