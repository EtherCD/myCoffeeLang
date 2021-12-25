function parser(lexems, dictionary) {
	let start = `#include <stdio.h>\n\nint main() {\n`;
	let current = "";
	let end = `	return 0;\n}`;

	if (lexems && lexems.lenght !== 0) {
		for (let lexem of lexems) {
			let functionName = lexem["function"];
			let valueObj = lexem["value"].trim();

			if (lexem["function"] && dictionary["function"][functionName]) {
				let currentFunction = dictionary["function"][functionName.toLowerCase()];

				current += currentFunction(valueObj);	
			} else {
				console.error("Function \""+functionName+"\" isn't registred!!!")
			}
		}
		return start + current + end;
	} else {
		console.log("Parser error:Array of lexems is empty!")
	}
}

module.exports.parser = parser;