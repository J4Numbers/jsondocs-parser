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

const moduleUnderTest = '../../../../lib/variable_matcher';
const sampleData = require('../../../resources/excerpt_examples');
const proxyquire = require('proxyquire');

describe('lib/variable_matcher.js', () => {
  let Module;
  let descriptionExtractorFake;
  beforeEach(() => {
    descriptionExtractorFake = sinon.fake.returns('TRANSLATED');
    Module = proxyquire(moduleUnderTest, {
      './logger': () => {
        return {
          debug: () => {}
        };
      },
      './common_extractors': {
        regexExtractDescription: descriptionExtractorFake
      }
    });
  });

  describe('findAllVariables', () => {
    it('should find nothing when no excerpts are provided', () => {
      expect(Module(sampleData.no_items, '\\[!', '!\\]')).to.deep.equal({});
    });

    it('should find nothing when no variable excerpts are provided', () => {
      expect(Module(sampleData.no_valid_items, '\\[!', '!\\]')).to.deep.equal({});
    });

    it('should find one variable when one excerpt is provided', () => {
      expect(Module(sampleData.single_variable, '\\[!', '!\\]')).to.deep.equal(sampleData.single_variable_result);
    });

    it('should store both items if variables with identical names are found', () => {
      expect(Module(sampleData.multiple_identical_variables, '\\[!', '!\\]')).to.deep.equal(sampleData.multiple_identical_variables_result);
    });
  });
});
