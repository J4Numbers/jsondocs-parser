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

const classMatcher = require('./class_matcher');
const classVariableMatcher = require('./class_variable_matcher');
const classFunctionMatcher = require('./class_function_matcher');

const populateClassJsonObjects = (extracts) => {
  let foundClasses = {};
  let allClassesFound = classMatcher(extracts);
  Object.values(allClassesFound).forEach(classItem => {
    foundClasses[classItem.class_name] = {
      ...classItem,
      ...{
        variables: classVariableMatcher(classItem.class_name, extracts),
        functions: classFunctionMatcher(classItem.class_name, extracts)
      }
    };
  });
  return foundClasses;
};

module.exports = populateClassJsonObjects;
