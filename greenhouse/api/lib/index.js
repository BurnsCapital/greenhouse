
/**
  * lib manager
  */


// internal
const logger = require('./logger.js');

// external
const sleep = function(ms) {return new Promise(resolve => setTimeout(resolve, ms));}

module.exports = { 
  logger : logger,
  sleep : sleep,
}