const {
  addTasks,
  updateTasks,
  deleteTasks,
  getTaskById,
  getTasks,
} = require("../controllers/Task");
const {
  addTaskValidation,
  updateTaskValidation,
  deleteTaskValidation,
  getTaskByIdValidation,
} = require("../validators/Task");
const { customValidation } = require("../middlewares/Validation");
const taskRouter = require("express").Router();

taskRouter.post("/", customValidation(addTaskValidation), addTasks);

taskRouter.put("/:taskId", customValidation(updateTaskValidation), updateTasks);

taskRouter.delete("/", customValidation(deleteTaskValidation), deleteTasks);

taskRouter.get("/", getTasks);
taskRouter.get(
  "/:taskId",
  customValidation(getTaskByIdValidation),
  getTaskById
);

module.exports = taskRouter;
