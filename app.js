#! /usr/bin/env node
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

const argv = require('minimist')(
  process.argv.slice(2),
  {
    alias: {
      inc: ['i', 'include'],
      ext: ['extension', 'e'],
      out: ['o', 'output'],
      debug: ['d']
    },
    default: {
      inc: ['.'],
      ext: ['.*[.].*'],
      ignore: [],
      out: 'docs.jsondocs.json',
      debug: false,
      'doc-start': '\\[!',
      'doc-end': '!\\]'
    }
  }
);

const logger = require('./lib/logger')({debug: argv.debug});
const directoryScanner = require('./lib/directory_scan');
const docExtractor = require('./lib/extract_basic_docs');
const jsondocsGenerator = require('./lib/jsondocs_generator');
const writeToFile = require('./lib/write_to_file');

if (typeof(argv.out) !== 'string') {
  logger.error('Only one output option allowed');
  process.exit(1);
}
if (typeof(argv['doc-start']) !== 'string') {
  logger.error('Starting documentation must only be given one option');
  process.exit(1);
}
if (typeof(argv['doc-end']) !== 'string') {
  logger.error('Ending documentation must only be given one option');
  process.exit(1);
}

if (typeof(argv.inc) !== 'object') {
  logger.debug('Converting single inclusion object to an array');
  argv.inc = [argv.inc];
}

if (typeof(argv.ext) !== 'object') {
  logger.debug('Converting single extension object to an array');
  argv.ext = [argv.ext];
}

if (typeof(argv.ignore) !== 'object') {
  logger.debug('Converting single ignore item to an array');
  argv.ignore = [argv.ignore];
}

let filesToScan = directoryScanner(argv.inc, argv.ext, argv.ignore);
let matchesFound = docExtractor(filesToScan, argv['doc-start'], argv['doc-end']);
let jsonDocs = jsondocsGenerator(matchesFound, argv['doc-start'], argv['doc-end']);

writeToFile(argv.out, jsonDocs);
