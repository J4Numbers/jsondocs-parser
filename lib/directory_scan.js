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

const path = require('path');
const fs = require('fs');
const logger = require('./logger')();

const directoryWalk = (inputDirectories=[], ignoreRegex=[]) => {
  let resolvedDirectories = [];
  Object.values(inputDirectories).forEach(dir => {
    logger.debug(`Scanning ${path.resolve(dir)} for directories`);
    let files = fs.readdirSync(path.resolve(dir), {withFileTypes: true});
    let directories = files
      .filter(file => file.isDirectory())
      .filter(fsDir => !ignoreRegex.some(rx => new RegExp(`^${rx}$`, 'i').test(fsDir.name)))
      .filter(fsDir => !resolvedDirectories.includes(path.resolve(fsDir.name)))
      .map(fsDir => (path.resolve(dir, fsDir.name)));
    if (directories.length > 0) {
      resolvedDirectories = resolvedDirectories.concat(directories);
      let childDirectories = directoryWalk(directories);
      if (childDirectories.length > 0) {
        resolvedDirectories = resolvedDirectories.concat(childDirectories);
      }
    }
  });
  return resolvedDirectories;
};

const fileWalk = (availableDirectories=[], extensions=[], ignoreRegex=[]) => {
  let resolvedFiles = [];
  Object.values(availableDirectories).forEach(dir => {
    logger.debug(`Looking for files within ${dir}`);
    let potFiles = fs.readdirSync(dir, {withFileTypes: true});
    let files = potFiles
      .filter(potFile => potFile.isFile())
      .filter(fsFile => !ignoreRegex.some(rx => new RegExp(`^${rx}$`, 'i').test(fsFile.name)))
      .filter(fsFile => extensions.some(rx => new RegExp(`^${rx}$`, 'i').test(fsFile.name)))
      .map(fsFile => (path.resolve(dir, fsFile.name)));
    resolvedFiles = resolvedFiles.concat(files);
  });
  return resolvedFiles;
};

const findAllMatchingFiles = (inputDirectories=[], allowedExtensions=[], ignoreRegex=[]) => {
  return fileWalk(
    directoryWalk(inputDirectories, ignoreRegex).concat(inputDirectories.map(input => path.resolve(input))),
    allowedExtensions,
    ignoreRegex
  );
};

module.exports = findAllMatchingFiles;
