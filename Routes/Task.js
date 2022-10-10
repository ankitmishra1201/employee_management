
const express = require("express");
const Task_Act = require("../Controllers/Task.js");
const auth=require('../Middlewares/auth')
const router = express.Router();

router.get("/", auth, Task_Act.getTasks);
router.post("/", auth, Task_Act.createTask);
router.post("/filter", auth, Task_Act.getFilteredTasks);


module.exports = router;