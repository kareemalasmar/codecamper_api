const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');

// Load env Vars
dotenv.config({ path: './config/config.env' });

// Connect to databse
connectDB();

// Example custom logger
// const logger = require('./middleware/logger');

// Route files
const bootcamps = require('./routes/bootcamps');

const app = express();

// Example custom logger
// app.use(logger);

// Dev logging middleware via npm morgan package
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Mount routers
app.use('/api/v1/bootcamps', bootcamps);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

// Handle unhandled promise rejections
process.on('unhandled rejection', (err, promise) => {
  console.log(`Errpr: ${err.message}`);
  // Close server and exit process
  server.close(() => process.exit(1));
});
