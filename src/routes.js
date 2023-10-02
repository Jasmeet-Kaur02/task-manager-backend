const express = require("express");
const fs = require("fs");
const tasks = require("./data/tasks.json");
const { validator } = require("./helpers");

const router = express.Router();
const parsedTasks = JSON.parse(JSON.stringify(tasks));
const filePath = `${__dirname}/data/tasks.json`;

router.get("/", function async(req, res) {
  return res.status(200).json({
    status: true,
    message: "All tasks have been fetched successfully.",
    data: tasks,
  });
});

router.get("/:id", function async(req, res) {
  const taskId = req.params.id;
  const filteredTasks = parsedTasks.filter((task) => task.id == taskId);
  if (filteredTasks.length === 0) {
    return res.status(404).json({
      status: false,
      message: "Task with the provided ID doesn't exist.",
      data: null,
    });
  }
  return res.status(200).json({
    status: true,
    message: "Task has been fetched successfully.",
    data: filteredTasks,
  });
});

router.post("/", function (req, res) {
  const validatorRes = validator(req.body);
  if (validatorRes.status) {
    parsedTasks.push(req.body);
    fs.writeFile(
      filePath,
      JSON.stringify(parsedTasks),
      { encoding: "utf-8", flag: "w" },
      (err) => {
        if (err) {
          return res.status(500).json({
            status: false,
            message: err,
            data: null,
          });
        }
        return res.status(200).json({
          status: true,
          message: "Task has been created successfully.",
          data: tasks,
        });
      }
    );
  } else {
    return res.status(400).json({
      status: false,
      message: validatorRes.message,
      data: null,
    });
  }
});

router.put("/:id", function (req, res) {
  const validatorRes = validator(req.body);
  if (validatorRes.status) {
    const taskId = req.params.id;
    const index = parsedTasks.findIndex((task) => task.id == taskId);
    if (index >= 0) {
      parsedTasks[index] = req.body;
      fs.writeFile(
        filePath,
        JSON.stringify(parsedTasks),
        { encoding: "utf-8", flag: "w" },
        (err) => {
          if (err) {
            return res.status(500).json({
              status: false,
              message: err,
              data: null,
            });
          }
          return res.status(200).json({
            status: true,
            message: "Task has been updated successfully.",
            data: tasks,
          });
        }
      );
    } else {
      return res.status(404).json({
        status: false,
        message: "Task with the provided ID doesn't exist.",
        data: null,
      });
    }
  } else {
    return res.status(400).json({
      status: false,
      message: validatorRes.message,
      data: null,
    });
  }
});

router.delete("/:id", function (req, res) {
  const taskId = req.params.id;
  const filteredTasks = parsedTasks.filter((task) => task.id != taskId);
  fs.writeFile(
    filePath,
    JSON.stringify(filteredTasks),
    { encoding: "utf-8", flag: "w" },
    (err) => {
      if (err) {
        return res.status(500).json({
          status: false,
          message: err,
          data: null,
        });
      }
      return res.status(200).json({
        status: true,
        message: "Task has been deleted successfully.",
        data: tasks,
      });
    }
  );
});

module.exports = router;
