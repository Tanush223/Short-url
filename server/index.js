const express = require("express");
const app = express();
const port = 3000;
const allRoutes = require("./routes/index.routes");
const db = require("./models/db");

app.use(express.json());
app.use("/", allRoutes);

app.listen(port, () => {
  db.once("open", () => {
    console.log(`server is ruiing onn port ${port} and db is up`);
  }).on("error", (err) => {
    console.log(err);
  });
});
