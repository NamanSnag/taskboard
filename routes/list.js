const express = require('express');
const { verifyToken } = require('../utils/jwt_auth');
const { createList, deleteList, getList, updateTaskOrder } = require('../controller/list_Controller');
const listRouter = express.Router();

// create
listRouter.post('/create', verifyToken, createList);

// Read
listRouter.post('/all', verifyToken, getList);

// delete
listRouter.post('/delete/:listId', verifyToken, deleteList);

// update order
listRouter.post('/updateTaskOrder', verifyToken, updateTaskOrder);

module.exports = listRouter;