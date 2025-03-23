const Task = require("../database/models/Task");
const Response = require("../utility/Response");

const addTasks = async (req, res) => {
  const task = await Task.create({ ...req.body, status: "to-do" });

  return Response.success(res, task, "Task has been created successfully");
};

const updateTasks = async (req, res) => {
  const task = await Task.findById(req.body.taskId);

  Object.keys(req.body).forEach((key) => {
    if (req.body[key] !== null && key !== "taskId") {
      task[key] = req.body[key];
    }
  });

  await task.save();

  return Response.success(res, task, "Task has been updated successfully");
};

const deleteTasks = async (req, res) => {
  const { taskId } = req.body;

  const result = await Task.findByIdAndDelete(taskId);

  return Response.success(res, true, "Task have been deleted successfully");
};

const getTasks = async (req, res) => {
  const tasks = await Task.find();

  return Response.success(
    res,
    tasks,
    "All tasks have been fetched successfully"
  );
};

const getTaskById = async (req, res) => {
  const task = await Task.findById(req.body.taskId);

  return Response.success(res, task, "Task has been fetched successfully");
};

module.exports = {
  addTasks,
  updateTasks,
  deleteTasks,
  getTasks,
  getTaskById,
};
