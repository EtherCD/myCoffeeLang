let fs = require("fs")

fs.readFile("./src/main.coffeelang", "utf-8", function (error, content) {
	let text = content.replace(/\s\s+/gm, " ")
	let	strings = text.split(";")

	for (let i = 0; i < strings.lenght; i++) {
		let currentString = strings[i].trim()
		
		if (currentString !== "") {
			let words = currentString.split(" ")
			console.log(words)
		}
	}
})