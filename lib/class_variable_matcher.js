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

const logger = require('./logger')();
const { regexExtractDescription } = require('./common_extractors');

const regexMatch = (className, inputString, docStart, docEnd) => {
  const regex = new RegExp(`${docStart}<${className}>@<([A-Za-z0-9_]*):([A-Za-z]*)>\\*\\s+([a-zA-Z \\s.,!@<>':\t+\\-_*]*)\\s+\\*@${docEnd}`, 'mui');
  let classVarMatch = regex.exec(inputString);
  if (classVarMatch !== null) {
    return {
      name: classVarMatch[1],
      type: classVarMatch[2],
      desc: regexExtractDescription(classVarMatch[3])
    };
  }
  return false;
};

const findAllClassVariables = (className, extracts, docStart, docEnd) => {
  let foundClassVariables = {};
  Object.values(extracts).forEach(extract => {
    let match = regexMatch(className, extract, docStart, docEnd);
    if (match !== false) {
      logger.debug(`Found class variable of name ${match.name}`);
      if (!foundClassVariables.hasOwnProperty(match.name)) {
        foundClassVariables[match.name] = [];
      }
      foundClassVariables[match.name].push(match);
    }
  });
  return foundClassVariables;
};

module.exports = findAllClassVariables;
