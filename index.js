const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./app/database/index");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

dotenv.config();
connectDB();

app.get("/", (req, res) => {
  return res.send("testing route");
});

app.listen(process.env.PORT, () => {
  console.log("Application is running on port 8000");
});

module.exports = app;
