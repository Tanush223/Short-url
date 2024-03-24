const express = require("express");
const route = express.Router();
const zod = require("zod");
const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtkey = "password";

const userSignup = zod.object({
  name: zod.string(),
  email: zod.string(),
  password: zod.string(),
});
const userSignin = zod.object({
  email: zod.string(),
  password: zod.string(),
});

route.get("/", (req, res) => {
  res.send("hiiiii");
});

route.post("/signup", async (req, res) => {
  const { success } = userSignup.safeParse(req.body);
  if (!success) {
    return res.status(400).json({
      message: "invaled userinputs",
    });
  }
  try {
    const existingUser = await userModel.findOne({
      email: req.body.email,
    });
    if (existingUser) {
      return res.status(400).json({
        message: "user already exists try signing in",
      });
    }

    const password = await bcrypt.hash(req.body.password, 10);

    const user = await userModel.create({
      name: req.body.name,
      email: req.body.email,
      password: password,
    });

    const token = jwt.sign({ userId: user._id }, jwtkey);
    res.status(201).json({
      token: token,
      message: "user was created",
      user: { _id: user._id, email: user.email, name: user.name },
    });
  } catch (error) {
    console.log("error while sihning up user ", error);
    return res.status(411).json({
      message: "error while trying to siging up user ",
    });
  }
});

route.post("/signin", async (req, res) => {
  const { success } = userSignin.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "invaled inputs by user ",
    });
  }
  try {
    const existingUser = await userModel.findOne({
      email: req.body.email,
    });
    if (!existingUser) {
      return res.status(411).json({
        message: "invaled credentials try again ",
      });
    }
    const password = await bcrypt.compare(
      req.body.password,
      existingUser.password
    );
    if (!password) {
      return res.status(411).json({
        message: "invaled credentials try again ",
      });
    }
    const token = jwt.sign({ userId: existingUser._id }, jwtkey);
    res.status(201).json({
      token: token,
      message: "user loged in success fully",
      existingUser: { id: existingUser._id, name: userModel.name },
    });
  } catch (error) {
    console.log("error while sihning in user ", error);
    return res.status(411).json({
      message: "error while sihning in user ",
    });
  }
});

module.exports = route;
