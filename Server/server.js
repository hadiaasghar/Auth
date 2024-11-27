const express = require('express');
require('colors');

const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const connectDb = require('./config/db');
//connect to DB
connectDb();

// Initialize express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Main routes
app.use('/api/v1/test', require('./routes/testRoutes'));
app.use('/api/v1/auth', require('./routes/authRoutes'));
app.use('/api/v1/user',require('./routes/userRoutes'));

// Welcome route
app.get("/", (req, res) => {
  return res.status(200).send("Welcome to the food server");
});

// Catch undefined routes
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

// Global error handler
app.use((error, req, res, next) => {
  console.error(error.message.red); // Logs error message to the terminal in red
  res.status(error.status || 500).json({
    success: false,
    message: error.message || "Server Error",
  });
});

// Server port
const PORT = process.env.PORT || 3001;  
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`.green);
});
