let isempty = function (str) {
	return (typeof str === "undefined" || str === null || str === "");
};

module.exports.isempty = isempty;