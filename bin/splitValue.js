let isEmpty = require("./isEmpty.js").isempty;

let splitvalue = function (fullValue, types) {
	if (/\((.*?)\)/g.test(fullValue)) {
		let type = fullValue.match(/\((.*?)\)/g)[0].slice(1, -1);
		let value = fullValue.replace(new RegExp("\\("+type+"\\)", "g"), "");

		if (types.indexOf(type) !== -1) {
			if (!isEmpty(value)) {
				return {
					type: type,
					val: value
				}
			} else {
				console.error("splitValue error: Value cant be empty!");
				return;
			}
		} else {
			console.error(`splitValue error: Unknown type -> "${type}"`);
			return;
		}
	} else {
		for (let vared of global.vars) {
			if (global.vared.varName === fullValue) {
				return {
					type: global.vared.type,
					type: global.vared.value,
					varName: global.vared.varName
				};
			}
		}
	}
}

module.exports.splitvalue = splitvalue;