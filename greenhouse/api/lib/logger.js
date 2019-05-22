
// Configure logger settings


const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, prettyPrint } = format;

const logger = createLogger({
  format: combine(
    label({ label: "api" }),
    timestamp(),
    prettyPrint()
  ),
  transports: [
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.Console({level: process.env.LOG_LEVEL || 'info'})
  ]
})

logger.log('info','logger loaded');

module.exports = logger;
