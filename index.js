var fs = require('fs')

const delimiters = {
	pipe: "|",
	comma: ",",
	space: " ",
}

const output = []
const processFile = (fileName) => {
	const delimeter = delimiters[fileName.split(".")[0]]
	const lines = fs.readFileSync(fileName, 'utf8').split('\n').filter((item) => item.length > 0)
	
	const genderConverter = (data) => {
		data[2] = data[2] === "M" ? "Male" : "Female"
	}

	lines.forEach((line) => {
		const splitedLine = line.split(delimeter)
		const player = splitedLine.map((item) =>	item.trim())

		if(delimeter === "|") {
			player.splice(2,1)
			const color = player[3]
			player[3] = new Date(player[4]).toLocaleDateString()
			player[4] = color
			genderConverter(player)
			output.push(player)
		
		} if(delimeter === ",") {
			const color = player[3]
			player[3] = new Date(player[4]).toLocaleDateString()
			player[4] = color
			output.push(player)

		} if(delimeter === " ") {
				player.splice(2,1)
				player[3] = new Date(player[3]).toLocaleDateString()
				genderConverter(player)
				output.push(player)
			} 
	})
}
processFile("pipe.txt")
processFile("comma.txt")
processFile("space.txt")

const print = (name, data) => {
	console.log(name + ":")
	data.forEach((item) => {
		let row = ''
		item.forEach((word) => {
			row += " " + word
		})
		console.log(row)
	})
}

const data1 = output.sort((a, b) => {
	return a[2] === b[2] ? (a[0] > b[0] ? 1 : -1) : a[2] > b[2] ? 1 : -1
	// if(a[2] === b[2]) {
	// 	if(a[0] > b[0]) {
	// 		 return 1
	// 	 } else {
	// 		 return -1
	// 	 }
	//  } else if(a[2] > b[2]) {
	// 	 return 1
	//  } else {
	// 	 return -1
	//  }
})
print("Output 1", data1)

const data2 = output.sort((a, b) => {
	return new Date(a[3]).getTime() === new Date(b[3]).getTime() ? (a[0] > b[0] ? 1 : -1) : new Date(a[3]).getTime() > new Date(b[3]).getTime() ? 1 : -1
	// if(new Date(a[3]).getTime() === new Date(b[3]).getTime()) {
	//  if(a[0] > b[0]) {
	// 		return 1
	// 	} else {
	// 		return -1
	// 	}
	// } else if(new Date(a[3]).getTime() > new Date(b[3]).getTime()) {
	// 	return 1
	// } else {
	// 	return -1
	// }
})
print("Output 2", data2)

const data3 = output.sort((a, b) => {
	return a[0] < b[0] ? 1 : -1
})
print("Output 3", data3)