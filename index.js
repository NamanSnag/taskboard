const express = require('express');
require('dotenv').config()
const db = require('./config/mongoose');
const port = process.env.PORT || 8000;
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');

app.use(cors());

// cookie
app.use(cookieParser());

app.use(express.json());

// urlencoded add to extract data from
app.use(express.urlencoded());

// routes
app.use('/', require('./routes'));

// error handler
app.use((err, req, res, next)=>{
  const errorStatus = err.status || 500;
  const message = err.message || 'Something went wrong';
  return res.status(errorStatus).json({
      succcess: false,
      status: errorStatus,
      message: message,
      stack: err.stack
  })
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});