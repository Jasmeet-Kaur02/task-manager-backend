const Joi = require("joi");
const { EMAIl_REGEX, PASSWORD_REGEX } = require("../utility/constants");
const User = require("../database/models/User");

const isUniqueEmail = async (value) => {
  if (value) {
    const isAlreadyExists = await User.findOne({ email: value });
    if (isAlreadyExists) {
      const error = new Error();
      error.details = [
        { path: ["email"], message: "Email is already exists." },
      ];
      throw error;
    }
  }
};

const registerValidation = Joi.object({
  firstName: Joi.string().required().messages({
    "any.required": "First name is required.",
    "string.empty": "First name cannot be empty.",
    "string.base": "First name must be a string.",
  }),
  lastName: Joi.string().required().messages({
    "any.required": "Last name is required.",
    "string.empty": "Last name cannot be empty.",
    "string.base": "Last name must be a string.",
  }),
  email: Joi.string()
    .pattern(EMAIl_REGEX)
    .required()
    .messages({
      "string.pattern.base": "Email is invalid.",
      "any.required": "Email is required.",
      "string.empty": "Email cannot be empty.",
    })
    .external(isUniqueEmail),
  password: Joi.string().pattern(PASSWORD_REGEX).min(8).required().messages({
    "string.pattern.base":
      "Password should contain atleast one uppercase character, one lowercase character, one special character.",
    "any.required": "Password is required.",
    "string.empty": "Password cannot be empty.",
    "string.min": "Password should contain minimum 8 characters.",
  }),
});

const loginValidation = Joi.object({
  email: Joi.string().pattern(EMAIl_REGEX).required().messages({
    "string.pattern.base": "Email is invalid.",
    "any.required": "Email is required.",
    "string.empty": "Email cannot be empty.",
  }),
  password: Joi.string().pattern(PASSWORD_REGEX).min(8).required().messages({
    "string.pattern.base":
      "Password should contain atleast one uppercase character, one lowercase character, one special character.",
    "any.required": "Password is required.",
    "string.empty": "Password cannot be empty.",
    "string.min": "Password should contain minimum 8 characters.",
  }),
});

module.exports = {
  registerValidation,
  loginValidation,
};
