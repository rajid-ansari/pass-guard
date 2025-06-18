const mongoose = require("mongoose");

function connectDB() {
    mongoose
        .connect(`${process.env.DB_URI}/${process.env.DB_NAME}`)
        .then(() => {
            console.log("Connected to DB.");
        })
        .catch((err) => {
            console.log(`DB Error :: ${err.message}`);
        });
}

module.exports = connectDB;
