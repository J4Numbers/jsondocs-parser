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

/*
[!<var_a:string>*

This is the description of a variable named      var_a,
which is a string

*!]
 */

/*
[!<var_b:integer>*

Variable b is a bit different and is an integer instead this
time. However, it is still a valid thing, so... yeah.

*!]
 */

/*
[!<function_a>+

This is a function written in the key of c#

@param <string>:<var_a> This is the first parameter
@param <string>:<var_b> This is the second parameter
                        which has a longer description
@param <integer>:<var_c> This is the third parameter

@return <string> something arbitrary is returned here

+!]
 */

/*
[!This is a
multi
line
comment!]
 */

/*
[!<Foo>@

This is a class

@!]
 */

/*
[!<Foo>@<var_a:string>*

This is a global variable within a class that is accessible from
within the class

*@!]
 */

/*
[!<Foo>@<do_something>+

Do something with the input parameters

@param <integer>:<var_a> do something with this variable

@return <integer> return the variable now that something has been done to it

+@!]
 */

/*
[!<Bar>@

This is a class that inherits from Foo

@inherits <Foo>

@!]
 */
