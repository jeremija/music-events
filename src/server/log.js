'use strict';

var config = require('./config.js');
var winston = require('winston');

var customColors = {
  trace: 'white',
  debug: 'green',
  info: 'cyan',
  warn: 'yellow',
  error: 'red'
};

winston.addColors(customColors);

var logger = new winston.Logger({
    colors: customColors,
    levels: {
        trace: 0,
        debug: 1,
        info: 2,
        warn: 3,
        error: 5
    },
    transports: [
        new winston.transports.Console({
            level: config.settings.logLevel,
            colorize: 'all',
            timestamp: true
        })
    ]
});

module.exports = logger;