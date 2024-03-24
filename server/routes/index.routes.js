const express = require("express");
const { model } = require("mongoose");
const route = express.Router();
const userRoute = require("./user.route");
const urlRoute = require("./url.route");

route.use("/user", userRoute);
route.use("/url", urlRoute);

module.exports = route;
