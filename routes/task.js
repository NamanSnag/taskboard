const express = require('express');
const { verifyToken } = require('../utils/jwt_auth');
const { createTask, updateTask, getTask, deleteTask } = require('../controller/task_Controller');
const taskRouter = express.Router();

taskRouter.post('/create', verifyToken, createTask);
taskRouter.post('/update/:taskId', verifyToken, updateTask);
taskRouter.post('/all/:listId', verifyToken, getTask);
taskRouter.post('/', verifyToken, createTask);
taskRouter.post('/delete/:taskId',  verifyToken, deleteTask);

module.exports = taskRouter;