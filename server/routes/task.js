const express = require("express");
const { getAll, getTask, getTasks } = require("../controllers/task");
const router = express.Router();

router.get("/all", getAll);

router.get("/:id", getTask);

router.get("/api/tasks", getTasks);

module.exports = router;
