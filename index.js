const express = require("express");
const app = express();
const PORT = 3000;
const routes = require("./src/routes");

app.use(express.json());
app.use("/tasks", routes);

app.listen(PORT, (error) => {
  if (error) {
    console.log("Something went wrong");
  } else {
    console.log("Server is listening to port 3000");
  }
});
