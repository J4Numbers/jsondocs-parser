/*
 * MIT License
 *
 * Copyright (c) 2018 M4Numbers <m4numbers@gmail.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
const winston = require('winston');
const config = require('config');

class Logger {
  static getHandler(loggerName='master', opts={}) {
    if (Logger.loggerInstance === undefined) {
      Logger.loggerInstance = new Logger(loggerName);
    }
    return Logger.loggerInstance.getLogger(loggerName, opts);
  }

  constructor(loggerName) {
    winston.loggers.options.transports = [
      new winston.transports.Console({
        level: config.get('logger.level'),
        colorize: true
      })
    ];

    this.createLogger(loggerName);
  }

  createLogger(loggerName, options={}) {
    winston.loggers.add(loggerName, options);
  }

  getLogger(loggerName, options={}) {
    if (winston.loggers.get(loggerName) === undefined) {
      this.createLogger(loggerName, options);
    }
    return winston.loggers.get(loggerName);
  }
}

Logger.loggerInstance = undefined;

module.exports = Logger.getHandler;
