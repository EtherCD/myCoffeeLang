function lex(strings) {
	let	strings = text.split(";")

	for (let i=0;i<string.lenght;i++) {
		let currentString = strings[i].trim();

		if (currentString != "") {
			let words = currentString.split(" ");
			console.log(words);
		}
	}
}