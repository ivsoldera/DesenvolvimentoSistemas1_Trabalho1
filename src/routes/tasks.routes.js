const express = require("express");
const tasksControllers = 
require('../controllers/tasksControllers');

const router = express.Router();

router.get('/', tasksControllers.findAll);
router.get('/:responsible', tasksControllers.findByResponsible);
router.post('/', tasksControllers.create);
router.put('/:id', tasksControllers.editById);
router.delete('/:id', tasksControllers.deleteById);

module.exports = router;