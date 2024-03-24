const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://Admin:1234567890@new.8amgi6p.mongodb.net/shotUrl?retryWrites=true&w=majority&appName=new"
);
const db = mongoose.connection;

module.exports = db;
