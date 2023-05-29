const express = require('express');
require('dotenv').config();
const db = require('./config/mongoose');
const port = process.env.PORT || 3001;
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const mime = require('mime');

app.use(cors());

// Cookie
app.use(cookieParser());

app.use(express.json());

// URL-encoded to extract data from requests
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', require('./routes'));

app.use(express.static(path.join(__dirname, "./client/build")));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
})

// Error handler
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const message = err.message || 'Something went wrong';
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: message,
    stack: err.stack
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
