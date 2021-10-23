const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
//Import all routes
const userRoute = require("./routes/user");

app.use("/api", userRoute);

module.exports = app;
