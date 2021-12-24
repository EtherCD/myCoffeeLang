let Type = require("./Type.js").type;

let Eval = function (value) {
	if (Type(value) === "num" || Type(value) === "float") {
		let evaled = eval(value);
		
		if (typeof evaled === "number" && isFinite(evaled)) {
			return evaled;
		} else {
			console.error("Error while calculating the value!");
			return;
		}
	} else {
		return value;
	}
}

module.exports.eval = Eval;