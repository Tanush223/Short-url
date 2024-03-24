const express = require("express");
const route = express.Router();
const zod = require("zod");
const validator = require("./validation.middleware");
const urlModel = require("../models/url.model");
const shotid = require("shortid");

const urlCreate = zod.object({
  url: zod.string(),
});

route.get("/", (req, res) => {
  res.send("hiiiiiii");
});

route.post("/create", validator, async (req, res) => {
  const { success } = urlCreate.safeParse(req.body);
  if (!success) {
    return res.status(400).json({
      message: "invalied inputs",
    });
  }
  try {
    const userId = req.userId;
    const surl = shotid.generate();
    const shoturl = await urlModel.create({
      userId: userId,
      url: req.body.url,
      surl: surl,
    });
    res.status(200).json({
      message: "shoturl crested",
      shoturl,
    });
  } catch (error) {
    console.log("error while creating tiny url", error);
  }
});

route.get("/:surl", async (req, res) => {
  const surl = req.params.surl;
  if (!surl) {
    return res.status(400).json({
      message: "error while fetching sul",
    });
  }
  try {
    const url = await urlModel.findOne({
      surl: surl,
    });
    if (!url) {
      return res.status(400).json({
        message: "there is no surl ",
      });
    }
    res.redirect(url.url);
  } catch (error) {
    console.log("error while fetching url");
    return res.status(400).json({
      message: "error while fetching url",
    });
  }
});

module.exports = route;
