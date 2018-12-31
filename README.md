# JSONdocs Parser

A parser written to convert documentation within code into a machine-readable
format as described in the schema found [here][1]

## Using the project

This project is available as a runnable executable via npm. After installing
the package using `npm i -g jsondocs-parser`, then the script can be run with
the command of:

```bash
jsondocs-parse
```

By default, this will scan your current directory for all files, then look for
comments in every file it finds (see [Writing comments](#Writing comments to be parsed)).

Once it has this compiled list of documentation, it will then dump the compiled
list into a json file (this is set to `docs.jsondocs.json` by default). This can
be parsed and read by the sister project for this repository:
[react-jsondocs-viewer][2] (which has its own documentation).

### Program options

As can probably be guessed, there are a number of options that this project can
take which are used to change how it runs:

| option      | aliases    | default              | type            | description                                                    |
| ----------- | ---------- | -------------------- | --------------- | -------------------------------------------------------------- |
| `include`   | `i`, `inc` | `['.']`              | `Array<String>` | A collection of all directories to look for files in           |
| `extension` | `e`, `ext` | `['.*[.].*']`        | `Array<RegEx>`  | A collection of regex items that files will be matched against |
| `output`    | `o`, `out` | `docs.jsondocs.json` | `String`        | The file to output the compiled jsondocs                       |
| `debug`     | `d`        | `false`              | `Boolean`       | Output debug logging or not                                    |
| `ignore`    |            | `[]`                 | `Array<String>` | A collection of directories to ignore during search            |
| `doc-start` |            | `\\[!`               | `RegEx`         | A valid regex string denoting the start of documentation       |
| `doc-end`   |            | `!\\]`               | `RegEx`         | A valid regex string denoting the end of documentation         |

A few examples of use are as follows:

```
jsondocs-parse --include a --ext .*[.]js
```

> Only look at files ending with `.js` within the `./a` directory and all
subdirectories

```
jsondocs-parse --include a --ignore nested_in_a
```

> Read all files within `./a`, except those within any folder of name
`nested_in_a`

## Writing comments to be parsed

This parser is pretty simplistic and needs to be told where the relevant
comments within a codebase are. It does this with a few key key combinations.

By default, a documentation block begins with `[!` and ends with `!]`. This
can be overridden on the command line, but for the sake of this documentation,
these two are going to be used. As an additional aside, the only things that
should be replaced within the snippets below are the letters themselves. The
syntax itself is correct.

You can document three key concepts within a codebase (and some things under
them):
 * global variables
 * global functions
 * classes
   * class variables
   * class functions

### Variables

The documentation for a variable is made up of three key parts for the sake
of this parser:
 * The name of the variable
 * The logical type of the variable
 * A verbal description of the variable

In that regard, the following snippet denotes when a variable is being
documented:

```
[!<VARIABLE_NAME:VARIABLE_TYPE>*

VARIABLE_DESCRIPTION

*!]
```

### Functions

The documentation for a function is made up of four key parts for the sake of
this parser:
 * The name of the function
 * The description for what the function does
 * The parameters of a function (optional)
 * The return object from a function (optional) (only one allowed)
 
The following is a standard function definition that this parser will read

```
[!<FUNCTION_NAME>+

FUNCTION_DESCRIPTION

@param <PARAM_1_TYPE>:<PARAM_1_NAME> PARAM_1_DESCRIPTION
@param <PARAM_2_TYPE>:<PARAM_2_NAME> PARAM_2_DESCRIPTION

@return <RETURN_TYPE> RETURN_DESCRIPTION

+!]
```

### Classes

The documentation for a class is made up of five key parts for the sake of
this parser:
 * The name of the class
 * A description of the class in general
 * What this class inherits if anything (optional)
 * The functions within the class (see [Class Functions](#Class Functions))
 * The variables within the class (see [Class Variables](#Class Variables))

The class header itself can be documented as follows:

```
[!<CLASS_NAME>@

@inherits <INHERITED_CLASS>

CLASS_DESCRIPTION

@!]
```

#### Class Functions

The documentation for a class-scoped function is made up of the same four
key points as a normal function (see [Functions](#Functions)). The syntax for
a function within a given class is a bit different though as can be seen below:

```
[!<CLASS_NAME>@<FUNCTION_NAME>+

FUNCTION_DESCRIPTION

@param <PARAM_1_TYPE>:<PARAM_1_NAME> PARAM_1_DESCRIPTION
@param <PARAM_2_TYPE>:<PARAM_2_NAME> PARAM_2_DESCRIPTION

@return <RETURN_TYPE> RETURN_DESCRIPTION

+@!]
```

#### Class Variables

The documentation for a class-scoped variable is made up of the same three
key points as a normal variable (see [Variables](#Variables)). The syntax for
a variable within a given class is a bit different though as can be seen below:

```
[!<CLASS_NAME>@<VARIABLE_NAME:VARIABLE_TYPE>*

VARIABLE_DESCRIPTION

*@!]
```

[1]: https://gist.githubusercontent.com/M4Numbers/bbc3bd3abaab8cd7418a320bda33a3da/raw/07f042e87ffe587bff5545beaefca9c58299d1be/jsondocs.1-0-0.schema.json
[2]: https://github.com/M4Numbers/react-jsondocs-viewer
