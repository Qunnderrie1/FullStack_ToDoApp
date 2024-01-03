const express = require("express");
const task = require("../Model/TaskModel");
const user = require("../Model/UserModel");
const jwt = require("jsonwebtoken");
const { protect } = require("../MiddleWare/protectRoute");

const router = express.Router();

// create task
router.post("/", protect, async (req, res) => {
  try {
    const userTask = await task.create({
      task: req.body.userTask,
      user: req.user.id,
    });
    res.json({ userTask });
  } catch (error) {
    console.log(error);
  }

  res.end();
});

// Get task
router.get("/", protect, async (req, res) => {
  try {
    const tasks = await task.find({ user: req.user.id });
    res.json(tasks);
  } catch (error) {
    console.log(error);
  }
});

// Delete task
router.delete("/:id", protect, async (req, res) => {
  let { id } = req.params;

  if (req.user.id) {
    try {
      const deleteTask = await task.deleteOne({ _id: id });
      res.json(deleteTask);
    } catch (error) {
      console.log(error);
    }
  }
});

module.exports = router;
