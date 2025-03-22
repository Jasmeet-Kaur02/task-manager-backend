const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./app/database/index");
const cors = require("cors");
const routes = require("./app/routes");

const app = express();

app.use(express.json());
app.use(cors());

dotenv.config();
connectDB();

app.use("/api", routes);

app.listen(process.env.PORT, () => {
  console.log("Application is running on port 8000");
});

module.exports = app;
