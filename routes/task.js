const express = require('express');
const { verifyToken } = require('../utils/jwt_auth');
const { createTask, updateTask, getTask } = require('../controller/task_Controller');
const taskRouter = express.Router();

taskRouter.post('/create', verifyToken, createTask);
taskRouter.post('/update', verifyToken, updateTask);
taskRouter.post('/all/:listId', verifyToken, getTask);



module.exports = taskRouter;