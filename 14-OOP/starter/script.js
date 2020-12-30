'use strict';
// constructor function always start with a capital letter
// arrow functions won't work as function constructors
const Person = function (name, age) {
  this.name = name;
  this.age = age;
};
const lebron = new Person('Lebron', 36);
Person.prototype.calcByear = function () {
  const theWorstYear = 2020;
  this.birthYear = theWorstYear - this.age;
};
Person.prototype.team = 'Los Angeles Lakers';
console.log(Person.prototype);
lebron.calcByear();
console.log(lebron);
console.log(lebron.hasOwnProperty('name'), lebron.hasOwnProperty('team'));
console.log(lebron.team);
console.log(lebron.hasOwnProperty('hasOwnProperty'));
// own method creation
Array.prototype.unique = function () {
  return [...new Set(this)];
};
const arr = [2, 2, 2, 2, 4, 5, 6, 7, 7, 8, 4, 1];
console.log(arr.unique());

// coding challenge
/* 
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

GOOD LUCK 😀
*/

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};
Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log('Accelerated!', this.speed + ' km/h');
};
Car.prototype.brake = function () {
  this.speed -= 5;
  console.log('Brake applied', this.speed + ' km/h');
};
const car1 = new Car('BMW', 125);
const car2 = new Car('Mercedes', 95);
car1.accelerate();
car1.accelerate();
car2.accelerate();
car2.accelerate();
car1.brake();
car2.brake();
car2.brake();
car2.brake();
// /////////////////////////////////
// ES6 CLASSES

// es6 classes are still implemented with the help of prototypal inheritance
// The only diff is that the syntax makes more sense.
class Player {
  constructor(name, team, age) {
    this.name = name;
    this.team = team;
    this.age = age;
  }
  calBirthYear() {
    const theWorstYear = 2020;
    this.birthYear = theWorstYear - this.age;
  }
  static greet() {
    console.log('Hey nba player');
  }
}
const kingJames = new Player('Lebron James', 'Lakers', 36);
const slimReaper = new Player('Kevin Durant', 'Nets', 32);
kingJames.calBirthYear();
console.log(kingJames);
slimReaper.calBirthYear();
console.log(slimReaper);
console.log(kingJames.__proto__ === Player.prototype);
console.log(slimReaper.hasOwnProperty('calBirthYear'));
// getter and setter properties
// normal objects have get and set methods
const object = {
  name: 'jonas',
  movements: ['100', '200', '300'],
  get latest() {
    return this.movements.slice(-1).pop();
  },
  set latest(mov) {
    this.movements.push(mov);
  },
};
// it acts like a property and not as a function
console.log(object.latest);
object.latest = '500';
console.log(object.movements);
console.log(object.latest);
// ////////////////////////
// Static methods
// They can only be used on an object and cannot be used as methods.
// (12).parseFloat(12) gives error
Array.from(document.querySelectorAll('h1'));
// works fine
// but [1,2,3].from(...something) doesn't work well.

// IMPLEMENTING STATIC METHOD
Player.league = function () {
  console.log('he is in the NBA');
};
console.log(Player.league()); // error // long story short, a static method is not inherited // OBJECT.create method // the third one and the strange one
/* console.log(jonas.league()); */ const PersonProto = {
  calcAge() {
    return 2020 - this.birthYear;
  },
};
const person = Object.create(PersonProto);
person.birthYear = 1990;
person.name = 'Mahesh';
console.log(person.calcAge());
console.log(person);

// ////////////////////////////////////
// coding challenge 3
class Car6 {
  constructor(make, speed) {
    this.make = make;
    this._speed = speed;
  }
  accelerate() {
    // speed property cannot be altered, so we alter the _speed property
    this._speed += 10;
    console.log('Accelerated!', this.speed + ' km/h');
  }
  brake() {
    this._speed -= 5;
    console.log('Brake applied', this.speed + ' km/h');
  }
  get speedUS() {
    return `${this.speed / 1.6} mph`;
  }
  set speedUS(s) {
    // using _speed instead of speed to avoud infinite loop conflict
    this._speed = s * 1.6;
  }
  get speed() {
    return this._speed;
  }
}
const carOne = new Car6('BMW', 125);
const carTwo = new Car6('Mercedes', 95);
const carThree = new Car6('Ford', 110);
carOne.accelerate();
carOne.accelerate();
carTwo.accelerate();
carTwo.accelerate();
carThree.accelerate();
carThree.brake();
carOne.brake();
carTwo.brake();
carTwo.brake();
carTwo.brake();
console.log(carThree);
console.log(carThree.speedUS);
carThree.speedUS = 35.5;
console.log(carThree);

class EV extends Car6 {
  constructor(make, speed, charge) {
    super(make, speed);
    this.charge = charge;
  }
  accelerate() {
    this._speed += 20;
    this.charge -= 1;
    console.log(
      `the car moves at a speed of ${this.speed} kmph and the charge is ${this.charge}%.`
    );
  }
  chargeBattery(ch) {
    this.charge = ch;
  }
}
const elec = new EV('Tesla', 120, 67);
elec.accelerate();
console.log(elec.speedUS);
console.log(elec);
elec.chargeBattery(98);
elec.brake();
elec.accelerate();
console.log(elec.__proto__.__proto__);
