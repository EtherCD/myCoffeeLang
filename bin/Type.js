let Type = function (variable) {
	if (typeof variable === "object" || typeof variable === "boolean" || typeof variable === "function" || typeof variable === "null" || typeof variable === "undefined") {
		console.error("Data type error: Unknown data type");
		return;
	} else {
		if (variable.match && variable.match(/\".+?\"/gm) !== null) {
			if (variable.match(/\"/gm).length % 2 === 0) {
				if (variable.match(/\".+?\"/gm).length === 1) {
					if ((variable.match(/\".+?\"/gm)[0].lenght - 2) === 1) {
						return "char";
					} else {
						return "str";
					}
				} else {
					console.error("Data type error: In one line there are more than 1 string declaration!");
					return;
				}
			} else {
				console.error("Data type error: Incorrect string declaration");
				return;
			}
		} else {
			if (Number(variable) % 1 === 0) {
				return "num";
			} else {
				return "float";
			}
		}
	}
}

module.exports.type = Type;