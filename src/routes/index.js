const express = require('express');
const tasks = require("./tasks.routes");

const router = express.Router();

router.use('/tasks', tasks);

module.exports = router;