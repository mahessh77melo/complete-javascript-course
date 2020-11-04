console.log(parseInt('101px', 10)); // decimal system... output 10
console.log(parseInt('101px', 2)); // output in binary system
console.log(Number.parseInt('    58px  ')); // same output
console.log(isNaN(parseInt('e23'))); // checks whether it is a number  or  not
console.log(isNaN(+'20X')); // true
console.log(isNaN(23 / 0)); // false
// (23/0) is infinity in javaScript
console.log(isFinite(23 / 0)); // false
// parseFloat and parseInt are the goto methods

// working with powers
console.log(Math.sqrt(25)); // 25 ** (1/2)
console.log(25 ** 2);
console.log(25 ** (1 / 2));
console.log(Math.round(125 ** (1 / 3)));
// max and min
const arr = [2, 3, 45, 34, '56'];
console.log(Math.max(...arr));
console.log(Math.min(...arr));
// calculating the area covered by a circular dom element
console.log(Math.PI * parseFloat('10px') ** 2);

// writing a function to return a random number between the specified limits
const randomInt = (min, max) => Math.trunc(Math.random() * (max - min) + min);
console.log(randomInt(25, 28), randomInt(1, 8));

// three rounding methods in js
// round, ceil and floor. floor  rounds down no matter what. ceil round up no matter what. but round is unbiased.
// all of those three do type coercions
// math.trunc just truncates the decimals.
// trunc is ceil for negative numbers and floor for positive numbers
const long = 65.000000000003;
console.log(long.toFixed(2)); // 65.01

// mod operator
console.log(64 % 4);

// BIGINT ---- new primitive
// released in es2020
console.log(2 ** 53 - 1);
// previously this was the biggest number that js could represent safely
// but now that bigint is released. it can represent even bigger numbers
console.log(Number.MAX_SAFE_INTEGER);
// signified by an 'n' at the end of the number
console.log(32753285798237593287532109709n);

// working with dates
const past = new Date(2020, 9, 27, 9, 15, 0);
const now = new Date();
const daysPassed = (date2, date1) =>
  Math.round(
    Math.abs(new Date(date2) - new Date(date1)) / (1000 * 60 * 60 * 24)
  );
console.log(daysPassed(now, past));
console.log(past.toLocaleString());
console.log(now.toLocaleString());

// Internationaliztion
const gbNow = new Intl.DateTimeFormat('en-GB').format(now);
console.log(usNow);
