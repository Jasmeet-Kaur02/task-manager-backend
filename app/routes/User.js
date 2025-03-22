const { registerValidation, loginValidation } = require("../validators/User");
const { register, login } = require("../controllers/User");
const userRouter = require("express").Router();
const { customValidation } = require("../middlewares/Validation");

userRouter.post("/signup", customValidation(registerValidation), register);

userRouter.post("/login", customValidation(loginValidation), login);

module.exports = userRouter;
