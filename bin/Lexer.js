let lexer = function (content, dictionary) {
	let text = content.replace(/\s\s+/gm, " ");
	let	strings = text.split(";");

	let lexems = [];

	for (let string of strings) {
		let currentString = string.trim();

		if (currentString !== "" && currentString[0] !== "#") {
			let parts = currentString.split("<-");

			let command = parts[0].trim();
			let fullValue = parts[1].trim();
			let type = null;
			let value = null;

			let obj = {};

			if (/\((.*?)\)/g.test(fullValue)) {
				type = fullValue.match(/\((.*?)\)/g)[0].slice(1, -1);
				value = fullValue.replace(new RegExp("\\("+type+"\\)", "g"), "");
				
				if (dictionary["function"][command.toLowerCase()]) {
					if (dictionary["types"].indexOf(type) !== -1) {
						Object.assign(obj, {
							"function": command,
							"type": 	type,
							"value": 	value
						});
					} else {
						console.error("Data type error: Unknown data type");
					}
				} else  {
					//Object.assign(obj, {"ufunction":command});
					console.error("Naming error: unknown function");
				}
			} else {
				console.error("Syntax error: value type not specified!")
			}

			lexems.push(obj);

		}
	}

	return lexems;
}

module.exports.lexer = lexer;