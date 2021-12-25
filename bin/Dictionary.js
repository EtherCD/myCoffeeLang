let Type = require("./Type.js").type;
let Eval = require("./Eval.js").eval;
let isEmpty = require("./isEmpty.js").isempty;
let splitValue = require("./splitValue").splitvalue;

let dictionary = {
	"function" : {
		print : function (fullMaster) {
			let obj = splitValue(fullMaster, dictionary["types"]);

			let type = obj.type;
			let val = obj.val;

			let typeSymbol = "%";
			let parsedValue = Eval(val);

			if (Type(parsedValue) !== type) {
				console.error("Data type error: " + typeof parsedValue + " !== " + type);
				return;
			}

			let outValue = null;

			if (type === "char") {
				typeSymbol += "c";
				let ultraValue = parsedValue.toString();
				if (~ultraValue.indexOf("\"")) ultraValue = ultraValue.replace(/"/g, "'");
				outValue = ultraValue;
			}
			else if (type === "str") {
				typeSymbol += "s";
				let ultraValue = parsedValue.toString();
				if (~ultraValue.indexOf("'")) ultraValue.replace(/'/g, '"');
				outValue = ultraValue;
			}
			else if (type === "num") 		typeSymbol += "d";
			else if (type === "float") 		typeSymbol += "f";
			else if (type === "undefined")	typeSymbol += "s"; 
			else {
				console.error("Unknown data type:" + val.type);
				return;
			}

			if (typeSymbol === "%c" || typeSymbol === "%s") return `	printf("${typeSymbol}", ${outValue});\n`
			else return `	printf("${typeSymbol}", ${parsedValue});\n`},
		println : function (fullMaster) {
			let obj = splitValue(fullMaster, dictionary["types"]);

			let type = obj.type;
			let val = obj.val;

			let typeSymbol = "%";
			let parsedValue = Eval(val);

			if (Type(parsedValue) !== type) {
				console.error("Data type error: " + typeof parsedValue + " !== " + type);
				return;
			}

			let outValue = null;

			if (type === "char") {
				typeSymbol += "c";
				let ultraValue = parsedValue.toString();
				if (ultraValue.indexOf("\"") == 0) ultraValue = ultraValue.replace(/"/g, "'");
				outValue = ultraValue;
			}
			else if (type === "str") {
				typeSymbol += "s";
				let ultraValue = parsedValue.toString();
				if (ultraValue.indexOf("'") == 0) ultraValue.replace(/'/g, '"');
				outValue = ultraValue;
			}
			else if (type === "num") 		typeSymbol += "d";
			else if (type === "float") 		typeSymbol += "f";
			else if (type === "undefined")	typeSymbol += "s";
			else {
				console.error("Unknown data type:" + val.type);
				return;
			}

			if (type === "str" || type === "char") return `	printf("${typeSymbol}\\n", ${outValue});\n`
			else return `	printf("${typeSymbol}\\n", ${parsedValue});\n`},
		var : function (fullMaster) {
			let obj = splitValue(fullMaster, dictionary["types"]);

			let type = obj.type;
			let val = obj.val;

			if (val.match(/\</gm).length !== 1) {
				console.error("Variable declaration error: Unknown synax -> "+val);
				return;
			} else {
				let varName = val.split("<")[0].trim();
				let varValue = val.split("<")[1].trim();

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
								return `	char ${varName}[]=${varValue};\n`;
							} else if (Type(varValue) === "num") {
								return `	int ${varName} = ${varValue};\n`;
							} else {
								return `	${type} ${varName} = ${varValue};\n`;
							}
						}
					}
				}
			}},
		if: function (fullMaster) {
			if (/\((.*?)\)/g.test(fullMaster)) {
				let condition = fullMaster.match(/\((.*?)\)/g)[0].slice(1, -1);

				if (~condition.indexOf(">")) {
					let arrayOfConditions = condition.split(">");
					let startCondition = `	if (${arrayOfConditions[0]} >= ${arrayOfConditions[1]}) {\n`;
					let contentCondition = `\n`;
					let endCondition = `	}\n`;
					return startCondition + contentCondition + endCondition;
				} else if (~condition.indexOf("<")) {
					let arrayOfConditions = condition.split("<");
					let startCondition = `	if (${arrayOfConditions[0]} <= ${arrayOfConditions[1]}) {\n`;
					let contentCondition = `\n`;
					let endCondition = `	}\n`;
					return startCondition + contentCondition + endCondition;
				} else if (~condition.indexOf("=")) {
					let arrayOfConditions = condition.split("=");
					let startCondition = `	if (${arrayOfConditions[0]} == ${arrayOfConditions[1]}) {\n`;
					let contentCondition = `\n`;
					let endCondition = `	}\n`;
					return startCondition + contentCondition + endCondition;
				} else {
					console.error("Condition declaration error: Unknown condition sign!");
					return;
				}
				
			} else {
				console.error("Condition declaration error: incorrect condition structure!");
				return;
			}
		}},
	"types": [
		"num",
		"float",
		"str",
		"char"
	]
};

module.exports.dictionary = dictionary;