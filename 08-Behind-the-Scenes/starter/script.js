'use strict';
const calcAge = function () {
  const age = 2020 - this.birthYear;
  // console.log(this);
  this.age = age;
  const printAge = () => {
    const firstName = this.name;
    const output = `${firstName} is ${this.age} years old and is born in ${this.birthYear}`;
    console.log(output);
  };
  printAge();
};

const person = {
  name: 'Mahesh',
  birthYear: 1999,
  calcAge: calcAge,
  age: '',
};

person.calcAge();
console.log(person);
