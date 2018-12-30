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

const regexSwapSpaces = (inputString) => {
  return inputString.replace(/\s+/gi, ' ').trim();
};

const regexExtractDescription = (inputString) => {
  return regexSwapSpaces(
    inputString.replace(
      /@[a-zA-Z]*\s+[a-zA-Z \s.,!':\t\-_*<>]+/gi,
      ''
    )
  );
};

const regexExtractParameters = (inputString) => {
  const regex = new RegExp(/@param\\s+<([A-Za-z_])>:<([A-Za-z]*)>\\s+([A-Za-z \\s.,!':\t\-_*]*)\s+?/, 'mugi');
  let parameters = [];
  let paramCount = 0;
  let foundParam;
  while ((foundParam = regex.exec(inputString)) !== null) {
    parameters.push({
      pos: paramCount,
      type: foundParam[1],
      name: foundParam[2],
      desc: regexSwapSpaces(foundParam[3])
    });
    ++paramCount;
  }
  return parameters;
};

const regexExtractInherits = (inputString) => {
  const regex = new RegExp(/@inherits\\s+<([A-Za-z0-9]*)>/, 'miu');
  let foundInherit = regex.exec(inputString);
  return (foundInherit !== null) ? foundInherit[1] : null;
};

const regexExtractReturn = (inputString) => {
  const regex = new RegExp(/@return\\s+<([A-Za-z0-9]*)>\\s+([A-Za-z \\s.,!':\t\-_*]+)[\\s]*?/, 'mui');
  let foundReturn = regex.exec(inputString);
  return (foundReturn !== null)
    ? {
      type: foundReturn[1],
      desc: regexSwapSpaces(foundReturn[2])
    }
    : null;
};

module.exports = {
  regexSwapSpaces,
  regexExtractDescription,
  regexExtractParameters,
  regexExtractInherits,
  regexExtractReturn
};
