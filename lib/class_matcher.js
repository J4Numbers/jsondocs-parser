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
const { regexExtractDescription, regexExtractInherits } = require('./common_extractors');

const regexMatch = (inputString) => {
  const regex = new RegExp(`${config.get('docs.general.start')}<([A-Za-z0-9_]*)>@\\s+([a-zA-Z \\s.,!@<>':\t+\\-_*]*)\\s+@${config.get('docs.general.end')}`, 'mui');
  let classMatch = regex.exec(inputString);
  if (classMatch !== null) {
    return {
      class_name: classMatch[1],
      inherits: regexExtractInherits(classMatch[2]),
      desc: regexExtractDescription(classMatch[2])
    };
  }
  return false;
};

const findAllClasses = (extracts=[]) => {
  let foundClasses = {};
  Object.values(extracts).forEach(extract => {
    let match = regexMatch(extract);
    if (match !== false) {
      logger.debug(`Found class of name ${match.class_name}`);
      foundClasses[match.class_name] = match;
    }
  });
  return foundClasses;
};

module.exports = findAllClasses;
