'use strict';
const airline = 'TAP air Portugal';
const plane = 'A320neo';
console.log(airline.lastIndexOf('a'));
console.log(airline.indexOf('P'));
console.log(airline.slice(4, 7));
console.log(airline.toLowerCase());
console.log(plane.toLowerCase());
// fix capitalization in names.
const toTitleString = input => {
  const words = input.toLowerCase().split(' ');
  let output = words.map(word => word[0].toUpperCase() + word.slice(1));
  return output.join(' ');
};
let passenger = 'jOnAs schmedtmaNN the frontEnD MASTER';
console.log(toTitleString(passenger));
let statement =
  'All passengers come to boarding room no. 23. Boarding room no. 23';
console.log(statement.replace(/room/g, 'hall'));
console.log(plane.padStart(25, '+'));
console.log(airline.padStart(25, '+'));
const mask = (input, len = 3) => {
  input = input + '';
  const unMasked = input.slice(-len);
  return unMasked.padStart(input.length, '*');
};
console.log(mask(2048709378, 4));
console.log(mask(9080570207));
console.log(mask('293562873561243', 5));

// Snake to camel case coding challenge
const textArea = document.querySelector('textarea');
const btnSnake = document.querySelector('.btn-snake');
const btnCamel = document.querySelector('.btn-camel');

const snakeToCamel = input => {
  let processor = input.split('_');
  if (processor.length > 1) {
    processor = processor.map(toTitleString);
    processor[0] = processor[0].toLowerCase();
  }
  processor = processor.join('');
  return processor;
};

const camelToSnake = input => {
  let processor = input.split(/([A-Z])/);
  console.log(processor);
  processor = processor.map(str => {
    if (str.match(/[A-Z]/)) {
      str = '_' + str.toLowerCase();
    }
    return str;
  });
  processor = processor.join('');
  return processor;
};

btnSnake.addEventListener('click', () => {
  textArea.value = camelToSnake(textArea.value);
  console.log(textArea.value);
});

btnCamel.addEventListener('click', () => {
  textArea.value = snakeToCamel(textArea.value);
  console.log(textArea.value);
});
