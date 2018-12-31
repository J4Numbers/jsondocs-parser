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

const moduleUnderTest = '../../../../lib/directory_scan';
const proxyquire = require('proxyquire');
const path = require('path');

describe('lib/directory_scan.js', () => {
  let Module;
  beforeEach(() => {
    Module = proxyquire(moduleUnderTest, {'./logger': () => {return {debug: () => {}};}});
  });

  describe('findAllMatchingFiles', () => {
    it('should return nothing when no properties are provided', () => {
      expect(Module()).to.deep.equal([]);
    });

    it('should find all files when looking for everything', () => {
      const output = Module(['test/resources/walk'], ['.*[.].*'], []);
      expect(output).to.have.members([
        path.resolve('test/resources/walk/a.txt'),
        path.resolve('test/resources/walk/nest/d.txxt'),
        path.resolve('test/resources/walk/nest/e.txt'),
        path.resolve('test/resources/walk/nest/deep/b.txt'),
        path.resolve('test/resources/walk/nest/deep/c.txt'),
      ]);
    });

    it('should strip out files that are not in the extensions', () => {
      const output = Module(['test/resources/walk'], ['.*[.]txt'], []);
      expect(output).to.have.members([
        path.resolve('test/resources/walk/a.txt'),
        path.resolve('test/resources/walk/nest/e.txt'),
        path.resolve('test/resources/walk/nest/deep/b.txt'),
        path.resolve('test/resources/walk/nest/deep/c.txt'),
      ]);
    });

    it('should ignore files within ignored directories', () => {
      const output = Module(['test/resources/walk'], ['.*[.].*'], ['nest']);
      expect(output).to.have.members([
        path.resolve('test/resources/walk/a.txt')
      ]);
    });
  });
});
