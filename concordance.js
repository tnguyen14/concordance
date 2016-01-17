#! /usr/bin/env node

var fs = require('fs');

var args = process.argv.slice(2);
if (!args.length) {
	throw new Error('Please supply the text file to be parsed.');
}

var textFile = args[0];

fs.readFile(textFile, 'utf8', function (err, data) {
	if (err) {
		throw err;
	}
	// replace sentence endings with |, and then split text input into array of sentences
	// sentence endings are characters `.`, `?` or `!` followed by zero or more white space and an uppercased character
	var sentences = data.replace(/([.?!])\s*(?=[A-Z])/g, '|').split('|');

	// remove sentence endings from sentences
	sentences = sentences.map(function (sentence) {
		return sentence.trim().replace(/[.?!]$/g, '');
	});

	var dictionary = {};
	sentences.forEach(function (sentence, index) {
		var words = sentence.split(' ');
		words.forEach(function (word) {
			// remove , and : characters
			word = word.replace(/[,:]/, '').toLowerCase();
			// store word matches count and their sentence position
			// sentence position is 1-based, not zero.
			if (dictionary[word]) {
				dictionary[word].count++;
				dictionary[word].sentences.push(index + 1);
			// if the word has not been encountered before
			} else {
				dictionary[word] = {
					count: 1,
					sentences: [index + 1]
				};
			}
		});
	});

	// get alphabet order
	function getAlphabet (order) {
		return String.fromCharCode(order % 26 + 97).repeat(Math.floor(order / 26) + 1);
	}

	// construct output lines
	// eg.
	// ff. word			{3:1,1,2}
	var results = Object.keys(dictionary).sort().map(function (key, index) {
		return getAlphabet(index) + '. ' + key + '\t\t\t' + '{' + dictionary[key].count + ':' + dictionary[key].sentences.join(',') + '}';
	});

	// output the final result
	console.log(results.join('\n'));
});
