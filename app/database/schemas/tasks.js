const { Schema } = require("mongoose");

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxLength: 100,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxLength: 800,
  },
  date: {
    type: Date,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["pending", "to-do", "completed", "over-due"],
  },
});

module.exports = taskSchema;
