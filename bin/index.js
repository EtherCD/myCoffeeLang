let fs = require("fs");
let dictionary = require("./Dictionary.js").dictionary;
let lexer = require("./Lexer.js").lexer;
let parser = require('./Parser.js').parser;

fs.readFile("./src/main.coffeelang", "utf-8", function (error, content) {
	if (error === null) {
		let lexems = lexer(content, dictionary);

		let parsedString = parser(lexems, dictionary);

		console.log(parsedString);
		//console.log(JSON.stringify(lexems, null, 4));
		
	} else {
		console.error("Error: Can't open file!");
	}
})