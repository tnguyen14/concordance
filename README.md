# Concordance

Coding challenge called Concordance.

## Problem statement
> Given an arbitrary text document written in English, write a program that will generate a concordance, i.e. an alphabetical list of all word occurrences, labeled with word frequencies. Bonus: label each word with the sentence numbers in which each occurrence appeared.

See `sample.txt` for sample input, and `output.txt` for corresponding output.

## Usage

```sh
:; ./concordance.js sample.txt
```

## Solution
The main program is written in JavaScript and use node. Specifically, it uses node's File System (`fs`) API to read in the input text file.

A JavaScript object is used to keep track of words as its keys, and the occurence counts as well as sentence positions as its values.

```
{
	"all": {
		count: 2,
		sentences: [1, 3]
	}
}
```

The words are sorted using JavaScript [`sort()` method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort).

## Assumptions

- Sentences are ended with either a `.`, `!` or `?`.
- New sentences start with a capitalized word and a white space if preceded by another sentence.
- Characters `,` and `:` are stripped from words before the list is generated.
