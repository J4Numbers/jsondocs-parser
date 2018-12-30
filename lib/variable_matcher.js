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

const config = require('config');
const logger = require('./logger')();
const { regexExtractDescription } = require('./common_extractors');

const regexMatch = (input) => {
  const regex = new RegExp(`${config.get('docs.general.start')}<([A-Za-z0-9_]*):([A-Za-z0-9]*)>\\*\\s+([a-zA-Z \\s.,!@<>':\t+\\-_*]*)\\s+\\*${config.get('docs.general.end')}`, 'imu');
  let matchedItem;
  if ((matchedItem = regex.exec(input)) !== null) {
    return {
      name: matchedItem[1],
      type: matchedItem[2],
      desc: regexExtractDescription(matchedItem[3])
    };
  }
  return false;
};

const findAllVariables = (extracts=[]) => {
  let foundVariables = {};
  Object.values(extracts).forEach(extract => {
    let match = regexMatch(extract);
    if (match !== false) {
      logger.debug(`Found variable of name ${match.name}`);
      if (!foundVariables.hasOwnProperty(match.name)) {
        foundVariables[match.name] = [];
      }
      foundVariables[match.name].push(match);
    }
  });
  return foundVariables;
};

module.exports = findAllVariables;
