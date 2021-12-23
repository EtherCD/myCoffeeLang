let fs = require("fs");
let dictionary = require("./Dictionary.js").dictionary;
let lexer = require("./Lexer.js").lexer;

fs.readFile("./src/main.coffeelang", "utf-8", function (error, content) {
	if (error === null) {
		let lexems = lexer(content, dictionary);

		console.log(JSON.stringify(lexems, null, 4));
		
	} else {
		console.log("Error: Can't open file!");
	}
})