const User = require("../database/models/User");
const Response = require("../utility/Response");

const register = async (req, res) => {
  const user = await User.create(req.body);
  const token = user.getJWTtoken();

  return Response.success(
    res,
    { user, token },
    "Account has been created successfully"
  );
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const errorMessage = "Email or password is invalid";
  const user = await User.findOne({ email: email });

  if (!user) {
    return Response.error(res, null, errorMessage, 401);
  }
  const isValidPassword = user.isValidPassword(password);

  if (!isValidPassword) {
    return Response.error(res, null, errorMessage, 401);
  }
  const token = user.getJWTtoken();

  return Response.success(res, { user, token }, "Login Successfull");
};

module.exports = {
  register,
  login,
};
