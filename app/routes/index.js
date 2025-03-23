const userRouter = require("./User");
const router = require("express").Router();
const taskRouter = require("../routes/Task");

router.use("/", userRouter);

router.use("/tasks", taskRouter);

module.exports = router;
