const express = require('express');
const userRouter = express.Router();
const { userRegistration, userLogin } = require('../controller/user_Controller');

// create new user
userRouter.post('/register', userRegistration);

// login user
userRouter.post('/login', userLogin);

module.exports = userRouter;