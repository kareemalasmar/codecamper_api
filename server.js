const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
// Example custom logger
// const logger = require('./middleware/logger');

// Route files
const bootcamps = require('./routes/bootcamps');

// Load env Vars
dotenv.config({ path: './config/config.env' });

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

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
