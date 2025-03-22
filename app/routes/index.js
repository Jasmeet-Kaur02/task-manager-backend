const userRouter = require("./User");
const router = require("express").Router();

router.use("/", userRouter);

module.exports = router;
