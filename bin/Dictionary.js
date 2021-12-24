let Type = require("./Type.js").type;
let Eval = require("./Eval.js").eval;

let dictionary = {
	"function" : {
		print : function (type, val) {
			let typeSymbol = "%";
			let parsedValue = Eval(val);

			if (Type(parsedValue) !== type) {
				console.error("Data type error: " + typeof parsedValue + " !== " + type);
				return;
			}

			if (type === "char") 			typeSymbol += "c";
			else if (type === "str") 		typeSymbol += "s";
			else if (type === "num") 		typeSymbol += "d";
			else if (type === "float") 		typeSymbol += "f";
			else if (type === "undefined")	typeSymbol += "s";
			else {
				console.error("Unknown data type:" + val.type);
				return;
			}

			return `printf("${typeSymbol}", ${parsedValue});\n`
		},
		println : function (type, val) {
			let typeSymbol = "%";
			let parsedValue = Eval(val);

			if (Type(parsedValue) !== type) {
				console.error("Data type error: " + typeof parsedValue + " !== " + type);
				return;
			}

			if (type === "char") 			typeSymbol += "c";
			else if (type === "str") 		typeSymbol += "s";
			else if (type === "num") 		typeSymbol += "d";
			else if (type === "float") 		typeSymbol += "f";
			else if (type === "undefined")	typeSymbol += "s";
			else {
				console.error("Unknown data type:" + val.type);
				return;
			}

			return `printf("${typeSymbol}\\n", ${parsedValue});\n`
		},
		var : function (type, val) {
			if (val.match(/\<\-/gm).length !== 1) {
				console.error("Variable declaration error: Unknown synax: "+val);
				return;
			} else {
				let varName = val.split("<-")[0].trim();
				let varValue = val.split("<-")[1].trim();

				if (Type(varValue) !== type) {
					console.error("Variable declaration error: Type error ->" + type);
					return;
				} else {
					if (/[^a-zA-Z0-9]/gm.test(varName)) {
						console.error("Variable declaration error: There are unacceptable symbols in the variable name -> " + varName);
						return;
					} else{
						if (/[0-9]/gm.test(varName[0])) {
							console.error("Variable declaration error: The first letter of the variable should not be a number -> " + varName);
							return;
						} else {
							if (Type(varValue) === "str") {
								return `char ${varName}[]=${varValue};\n`;
							} else if (Type(varValue) === "num") {
								return `int ${varName}=${varValue};\n`;
							} else {
								return `${type} ${varName}=${varValue};\n`;
							}
						}
					}
				}
			}
		}
	},
	"types": [
		"num",
		"float",
		"str",
		"char"
	]
};

module.exports.dictionary = dictionary;