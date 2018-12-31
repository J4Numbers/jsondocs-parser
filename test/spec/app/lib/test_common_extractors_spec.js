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

const Module = require('../../../../lib/common_extractors');

describe('common_extractors.js', () => {
  describe('regexSwapSpaces', () => {
    it('should do nothing if only single-spaced strings exist', () => {
      const input = 'This is a test';
      expect(Module.regexSwapSpaces(input)).to.equal(input);
    });

    it('should flatten additional spaces to single-spaced strings', () => {
      const input = 'This     is a    test';
      expect(Module.regexSwapSpaces(input)).to.equal('This is a test');
    });

    it('should replace special whitespace characters with spaces', () => {
      const input = 'This\tis\na test';
      expect(Module.regexSwapSpaces(input)).to.equal('This is a test');
    });
  });

  describe('regexExtractDescription', () => {
    it('should do nothing with a prepared description', () => {
      const input = 'This is a prepared description';
      expect(Module.regexExtractDescription(input)).to.equal(input);
    });

    it('should flatten additional spaces', () => {
      const input = '\n\nThis is a prepared\ndescription\n\n';
      expect(Module.regexExtractDescription(input)).to.equal('This is a prepared description');
    });

    it('should remove parameters', () => {
      const input = 'This is a prepared description\n\n@param <string>:<var_a> Description';
      expect(Module.regexExtractDescription(input)).to.equal('This is a prepared description');
    });

    it('should remove returns', () => {
      const input = 'This is a prepared description\n\n@return <string> a thing here';
      expect(Module.regexExtractDescription(input)).to.equal('This is a prepared description');
    });
  });
});
