const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

// user registration
const userRegistration = async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
    
        // Check if the user exists
        const user = await User.findOne({ email });
        if (user) {
            return res.status(403).json({ msg: "Email already in use"})
        }
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            email,
            username,
            password: passwordHash
        });
    
        return res.status(200).json(newUser);
      } catch (error) {
        next(error);
      }
};

/* LOGGING IN */
const userLogin = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });
      if (!user) return res.status(400).json({ msg: "User does not exist. " });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const data = {
        email : user.email,
        username : user.username,
        id: user._id,
      }
      return res.cookie("token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({
        msg: "logIn sucessfully",
        details: data,
        token: token
      });
    } catch (err) {
      next(err);
    }
  };

  module.exports = {
    userRegistration,
    userLogin
  }