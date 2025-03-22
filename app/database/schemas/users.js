const { Schema } = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  const salt = bcrypt.genSaltSync(12);
  this.password = bcrypt.hashSync(this.password, salt);
  next();
});

userSchema.methods.isValidPassword = function (enteredPassword) {
  return bcrypt.compareSync(enteredPassword, this.password);
};

userSchema.methods.getJWTtoken = function () {
  console.log(process.env.JWT_SECRET);
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET);
};

module.exports = userSchema;
