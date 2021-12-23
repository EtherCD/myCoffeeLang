let lexer = function (content, dictionary) {
	let text = content.replace(/\s\s+/gm, " ");
	let	strings = text.split(";");

	let lexems = [];

	for (let string of strings) {
		let currentString = string.trim();

		if (currentString !== "") {
			let words = currentString.split(" ");
			let copyString = currentString;
			let stringObjects = {};

			let command = words[0];

			if (dictionary["function"].indexOf(command.toLowerCase()) !== -1) {
				Object.assign(stringObjects, {"function":command});
			} else {
				Object.assign(stringObjects, {"ufunction":command})
			}

			let value = copyString.replace(new RegExp(command + " <- ", "g"), "");

			if (/\"(.*)\"/gim.test(value)) {
				if (value.lenght === 1) {
					Object.assign(stringObjects, {
						"value":{
							"type": "char",
							"value": value
						}
					});
				} else {
					Object.assign(stringObjects, {
						"value":{
							"type": "string",
							"value": value
						}
					});
				}
			} else {
				//Number

				//Object.assign(stringObjects, {"number":value});

				if (Number(value)) {
					if (Number(value) % 1 === 0) {
						if (Number(value) > -2147483648 && Number(value) < 2147483648) {
							Object.assign(stringObjects, {
								"value":{
									"type": "number",
									"value": Number(value)
								}
							});
						} else {
							if (Number(value) > -9223372036854775808 && Number(value) > 9223372036854775808) {
								Object.assign(stringObjects, {
									"value":{
										"type": "number",
										"subtype": "lognnum",
										"value": Number(value)
									}
								});
							} else {
								Object.assign(stringObjects, {
									"value":{
										"type": "number",
										"subtype": "infinity",
										"value": Number(value)
									}
								});
							}
						}
					} else {
						Object.assign(stringObjects, {
							"value":{
								"type": "float",
								"value": Number(value)
							}
						});
					}
				} else {
					Object.assign(stringObjects, {
						"value":{
							"type": "undefined",
							"value": value
						}
					});
				}
			}

			lexems.push(stringObjects);

		}
	}

	return lexems;
}

module.exports.lexer = lexer;