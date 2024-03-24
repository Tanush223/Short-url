const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel",
    require: true,
  },
  url: {
    type: String,
    require: true,
  },
  surl: {
    type: String,
    require: true,
  },
});

const urlModel = mongoose.model("urlModel", urlSchema);

module.exports = urlModel;
