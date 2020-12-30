// Remember, we're gonna use strict mode in all scripts now!
'use strict';
// temprature function
let adn = 3;
const measureKelvin = () => {
	const values = {
		type: 'temp',
		unit: 'celsius',
		// value: Number(prompt('Enter the temprature : ')),
		value: 23,
	};
	console.table(values);
	return 273 + values.value;
};
console.log(`The temprature in Kelvin : ${measureKelvin()}`);
// 1) Understanding the problem
// - Array transformed to string, separated by ...
// - What is the X days? Answer: index + 1

// 2) Breaking up into sub-problems
// - Transform array into string
// - Transform each element to string with ºC
// - Strings needs to contain day (index + 1)
// - Add ... between elements and start and end of string
// - Log string to console

const data1 = [17, 21, 23];
const data2 = [12, 5, -5, 0, 4];
const printTemp = arr => {
	let finalString = '... ';
	arr.forEach((val, index) => {
		finalString += ` ${val}ºC in ${index + 1} days ...`;
	});
	return finalString;
};
console.log(printTemp(data1));
console.log(printTemp(data2));
