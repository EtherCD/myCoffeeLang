let dictionary = {
	"function" : {
		print : function (type, val) {
			let typeSymbol = "%";

			if (type === "char") 			typeSymbol += "c";
			else if (type === "str") 		typeSymbol += "s";
			else if (type === "num") 		typeSymbol += "d";
			else if (type === "float") 		typeSymbol += "f";
			else if (type === "undefined")	typeSymbol += "s";
			else {
				console.error("Unknown data type:" + val.type);
				return;
			}

			return `printf("${typeSymbol}", ${val});\n`
		},
		println : function (type, val) {
			let typeSymbol = "%";

			if (type === "char") 			typeSymbol += "c";
			else if (type === "str") 		typeSymbol += "s";
			else if (type === "num") 		typeSymbol += "d";
			else if (type === "float") 		typeSymbol += "f";
			else if (type === "undefined")	typeSymbol += "s";
			else {
				console.error("Unknown data type:" + val.type);
				return;
			}

			return `printf("${typeSymbol}\\n", ${val});\n`
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