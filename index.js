var fs = require('fs')

const delimiters = {
	pipe: {symbol: "|", last_name: 0, first_name: 1, gender: 3, date: 5, color: 4},
	comma: {symbol: ",", last_name: 0, first_name: 1, gender: 2, date: 4, color: 3},
	space: {symbol: " ", last_name: 0, first_name: 1, gender: 3, date: 4, color: 5},
}

let output = []
const processFile = (fileName) => {

	const genderConverter = (data) => {
		let result
		if(data === "M") {
			result = "Male"
		} else if(data === "F") {
			result = "Female"
		} else {
			result = data
		}
		return result
	}

	const delimeter = delimiters[fileName.split(".")[0]]
	if(delimeter){
		const lines = fs.readFileSync(fileName, 'utf8').split('\n')
	
		lines.forEach((line) => {
			if(line.trim().length > 0) {
				const splitedLine = line.split(delimeter.symbol)
				const player = splitedLine.map((item) => item.trim())
				
				let result = {
					last_name: player[delimeter.last_name],
					first_name: player[delimeter.first_name],
					color: player[delimeter.color],
					date: new Date(player[delimeter.date]).getTime(),
					gender: genderConverter(player[delimeter.gender])
				}
				output.push(result)
			}
		})
	}
	
}
processFile("pipe.txt")
processFile("comma.txt")
processFile("space.txt")

const print = (name, items) => {
	console.log(`\n${name} : `)
	items.forEach(({last_name, first_name, gender, date, color}) => {
		let row = `${last_name} ${first_name} ${gender} ${new Date(date).toLocaleDateString()} ${color}`
		console.log(row)
	})
}
const data1 = output.sort((a, b) => {
	if(a.gender === b.gender) {
		if(a.last_name > b.last_name) {
			 return 1
		 } else {
			 return -1
		 }
	 } else if(a.gender > b.gender) {
		 return 1
	 } else {
		 return -1
	 }
})
print("Output 1", data1)

const data2 = output.sort((a, b) => {
	if(a.date === b.date) {
	 if(a.last_name > b.last_name) {
			return 1
		} else {
			return -1
		}
	} else if(a.date > b.date) {
		return 1
	} else {
		return -1
	}
})
print("Output 2", data2)

const data3 = output.sort((a, b) => {
	return a.last_name < b.last_name ? 1 : -1
})
print("Output 3", data3)