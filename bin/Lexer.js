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

			let obj = {};

			if (dictionary["function"][command.toLowerCase()]) {
				Object.assign(obj, {
					"function": command,
					"value": fullValue
				});
			} else  {
				//Object.assign(obj, {"ufunction":command});
				console.error("Naming error: unknown function");
				return;
			}

			lexems.push(obj);

		}
	}

	return lexems;
}

module.exports.lexer = lexer;