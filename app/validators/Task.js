const Joi = require("joi");
const Task = require("../database/models/Task");
const mongoose = require("mongoose");

const { ObjectId } = mongoose.Types;

const validateTaskId = async (value) => {
  const error = new Error();
  error.customMessage = "Task id is invalid.";
  if (!ObjectId.isValid(value)) {
    throw error;
  }
  const task = await Task.findById(value);

  if (!task) {
    throw error;
  }
};

const addTaskValidation = Joi.object({
  title: Joi.string().max(100).required().messages({
    "any.required": "Title is required",
    "string.empty": "Title cannot be empty",
    "string.max": "Title cannot be longer than 100 characters",
  }),
  description: Joi.string().max(800).required().messages({
    "any.required": "Description is required",
    "string.empty": "Description cannot be empty",
    "string.max": "Description cannot be longer than 800 characters",
  }),
  date: Joi.date()
    .iso()
    .min(new Date().toISOString().split("T")[0])
    .required()
    .messages({
      "any.required": "Date is required",
      "date.base": "Invalid date format",
      "date.min": "Date must be today or later",
    }),
  startTime: Joi.date().greater("now").required().messages({
    "any.required": "Start time is required",
    "date.base": "Invalid start time format",
    "date.greater":
      "Start time must be equal to or later than the current time",
  }),
  endTime: Joi.date().greater(Joi.ref("startTime")).required().messages({
    "any.required": "End time is required",
    "date.base": "Invalid end time format",
    "date.greater": "End time must be later than start time",
  }),
});

const updateTaskValidation = Joi.object({
  title: Joi.string().max(100).allow(null).messages({
    "string.empty": "Title cannot be empty",
    "string.max": "Title cannot be longer than 100 characters",
  }),
  description: Joi.string().max(800).allow(null).messages({
    "string.empty": "Description cannot be empty",
    "string.max": "Description cannot be longer than 800 characters",
  }),
  status: Joi.string().allow(null).valid("completed").messages({
    "string.empty": "Status cannot be empty",
    "any.only": "Status can only be 'completed'",
  }),
  taskId: Joi.string()
    .required()
    .messages({
      "any.required": "Task id is required.",
    })
    .external(validateTaskId),
});

const deleteTaskValidation = Joi.object({
  taskId: Joi.string()
    .required()
    .messages({
      "any.required": "Task ids are required",
    })
    .external(validateTaskId),
});

const getTaskByIdValidation = Joi.object({
  taskId: Joi.string()
    .required()
    .messages({
      "any.required": "Task id is required.",
    })
    .external(validateTaskId),
});

module.exports = {
  addTaskValidation,
  updateTaskValidation,
  deleteTaskValidation,
  getTaskByIdValidation,
};
