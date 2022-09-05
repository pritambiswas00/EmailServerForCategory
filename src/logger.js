const { createLogger, format, transports } = require("winston");
require("winston-daily-rotate-file");
const path = require("path");
const zeroPad = (num) => (num < 10 ? `0${num}` : `${num}`);

/**
 * @description Gets a Local formatted date from Date object
 * @param {Date} date - A JavaScript Date object
 * @returns {string} A Local formatted date. DD/MM/YYYY
 */

const getLocalFormattedDate = (date = new Date()) =>
  `${zeroPad(date.getDate())}/${zeroPad(
    date.getMonth() + 1
  )}/${date.getFullYear()} ${zeroPad(date.getHours())}:${zeroPad(
    date.getMinutes()
  )}:${zeroPad(date.getSeconds())}`;

const { combine, timestamp, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `${getLocalFormattedDate()}  ${level}: ${message}`;
});

const logger = createLogger({
  format: combine(timestamp(), myFormat),
  transports: [
    new transports.DailyRotateFile({
      filename: path.join(__dirname,"logs/log-%DATE%.log"),
      datePattern: "YYYY-MM-DD",
      json: false,
      level: "debug",
      maxSize: "5m",
      maxFiles: "30d",
    }),
  ],
});

module.exports = logger;
