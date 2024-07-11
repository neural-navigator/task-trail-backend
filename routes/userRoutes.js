const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const taskController = require('../controllers/taskController');
const authenticate = require('../middleware/jwtValidator')

router.post('/create-user', userController.createUser);
router.post('/verify-user', userController.verifyUser);
router.post('/create-task', authenticate, taskController.createTask);
router.post('/get-task', authenticate, taskController.getTask);
router.post('/save-task', authenticate, taskController.saveTasks);
router.post('/get-user-tasks', authenticate, taskController.userTaskActivity);


module.exports = router;
