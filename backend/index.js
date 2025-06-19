require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

const connectDB = require("./db/db");

// routes
const userRoutes = require("./routes/user-routes");
const passwordRoutes = require("./routes/password-routes");

const PORT = process.env.PORT || 3000;

connectDB();

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Pass Guard, Manager.");
});

app.use("/user", userRoutes);
app.use("/password", passwordRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
