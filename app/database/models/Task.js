const mongoose = require("mongoose");
const taskSchema = require("../schemas/tasks");

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
