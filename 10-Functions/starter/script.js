'use strict';
// Functions advanced topics
const incThree = num => num + 3;
const decThree = num => num - 3;
// Higher order
const transformer = (input, fn) => {
  console.log(`Originial Value : ${input}`);
  console.log(`Transformed Value : ${fn(input)}`);
  console.log(`Function Name : ${fn.name}`);
  return fn(input);
};
// transformer(5, incThree);

// Functions returning functions.
function greet(greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
}
greet('hey')('Mahesh');
// arrows returning arrows
const greetArrow = greeting => name => console.log(`${greeting} ${name}`);
greetArrow('Hi')('Mahesh');

// Call and apply methods in functions
const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  // book: function() {}
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};
const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};
const book = lufthansa.book;
// Calling the function with a different object
book.call(eurowings, 23, 'Teddy');
// normal function call
lufthansa.book(43, 'John Gampbell');

// Alternative for book.call(eurowings, 23, 'Teddy');
// using the bind method.
const euBook35 = book.bind(eurowings, 35);
// first argument is the thisArg and rest of them are rest parameters.
// parameters can also be passed into the new function.
euBook35('Kevin Durant');
// bind can also be used in the place of call.
/* except it returns a function rather than directly calling it.
if u don't have anything to do with the this keyword, then just pass null as the first argument
*/

// CLOSURES
const secureBooking = () => {
  let passengers = 0;
  return () => {
    passengers++;
    console.log(`${passengers} passengers.`);
  };
};
const booker = secureBooking();
booker();
booker();
booker();
/* 
SO even after the secureBooking functions comes out of the execution context , it is able to access the parent scope variables(passengers). This is possible because of a feature called closures. the returned value which is a function is stored in the booker const. So the booker function now has access to the passengers variable which was initially not in its scope.
*/
/* 
A function always has access to the variable environment of the execution context in which is was created.
*/
