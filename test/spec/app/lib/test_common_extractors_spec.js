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

  describe('regexExtractParameters', () => {
    it('should extract nothing when there are no parameters to extract', () => {
      const input = 'This is a description with no parameters';
      expect(Module.regexExtractParameters(input)).to.deep.equal([]);
    });

    it('should extract one parameter when there is one to extract', () => {
      const input = 'Parameter following\n@param <string>:<var> description of var\n';
      expect(Module.regexExtractParameters(input)).to.deep.equal([{
        pos: 0,
        type: 'string',
        name: 'var',
        desc: 'description of var'
      }]);
    });

    it('should extract multiple parameters when there are multiple', () => {
      const input = 'something\n@param <string>:<var_a> description of a\n'
                  + '@param <integer>:<var_b> description of b\n'
                  + '@param <boolean>:<var_c> description of c\n';
      expect(Module.regexExtractParameters(input)).to.deep.equal([
        {
          pos: 0,
          type: 'string',
          name: 'var_a',
          desc: 'description of a'
        },
        {
          pos: 1,
          type: 'integer',
          name: 'var_b',
          desc: 'description of b'
        },
        {
          pos: 2,
          type: 'boolean',
          name: 'var_c',
          desc: 'description of c'
        }
      ]);
    });
  });

  describe('regexExtractInherits', () => {
    it('should return null when no inherits are present', () => {
      const input = 'This has no inherits clause';
      expect(Module.regexExtractInherits(input)).to.be.null;
    });

    it('should return the inherited name when it is present', () => {
      const input = 'Inherits following\n@inherits <Foo>\n';
      expect(Module.regexExtractInherits(input)).to.equal('Foo');
    });
  });

  describe('regexExtractReturn', () => {
    it('should return null when no return clause exists', () => {
      const input = 'This has no return statement';
      expect(Module.regexExtractReturn(input)).to.be.null;
    });

    it('should return a return object if a return clause exists', () => {
      const input = 'The return is as follows:\n@return <string> description as follows';
      expect(Module.regexExtractReturn(input)).to.deep.equal({
        type: 'string',
        desc: 'description as follows'
      });
    });
  });
});
