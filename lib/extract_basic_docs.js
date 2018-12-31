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

const fs = require('fs');
const logger = require('./logger')();

const extractValidParseTargets = (fileList=[], docStart, docEnd) => {
  let matchedTargets = [];
  Object.values(fileList).forEach(filePath => {
    logger.info(`Scanning ${filePath} for regex matches`);
    let readFile = fs.readFileSync(filePath, {encoding: 'utf-8'});
    let pattern = new RegExp(`${docStart}[^]*?${docEnd}`, 'imug');
    let foundMatches;
    while ((foundMatches = pattern.exec(readFile)) !== null) {
      logger.debug(`Match ${foundMatches.index} within file`);
      matchedTargets.push(foundMatches[0]);
    }
  });
  return matchedTargets;
};

module.exports = extractValidParseTargets;
