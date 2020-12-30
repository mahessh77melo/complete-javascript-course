'use strict';
const weekDays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const openingHours = {
  // Way to compute property names..
  // surround it by [ ]
  [weekDays[3]]: {
    open: 12,
    close: 22,
  },
  [weekDays[4]]: {
    open: 11,
    close: 23,
  },
  ['sat']: {
    open: 0,
    close: 24,
  },
};
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  openingHours,
};

const { starterMenu: starters } = restaurant;
for (const [index, item] of starters.entries()) {
  console.log(`Item no. ${index + 1} is ${item}`);
}
for (const day of weekDays) {
  const open = restaurant.openingHours[day]?.open ?? false;
  console.log(
    open !== false
      ? `On ${day}, we open as ${open}:00 hrs `
      : `We don't open on ${day} `
  );
}
for (const day of Object.values(starters)) {
  console.log(day);
}
for (const [key, { open, close }] of Object.entries(openingHours)) {
  console.log(
    `On ${key}, restaurant opens at ${open}:00 and closes at ${close}:00 `
  );
}
// MAPS IN JAVASCRIPT
const myMap = new Map();
myMap
  .set('name', 'Classicano Italiano')
  .set(2, openingHours.thu)
  .set(true, 'We would be open by then')
  .set(false, 'We will be closed at that time');
const myTime = 23;
const myDay = 'thu';
console.log(
  myMap.get(
    myTime > openingHours[myDay].open && myTime < openingHours[myDay].close
  )
);
// Even booleans can be used as keys in maps.
const hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap);
console.log(Object.keys(openingHours));

const qMap = new Map([
  ['question', 'Best programming language in the world??'],
  [1, 'C++'],
  [2, 'JAVA'],
  [3, 'Python'],
  [4, 'JavaScript'],
  ['Correct', 4],
  [true, 'Correct 🥂'],
  [false, 'Wrong 😥'],
]);
const answer = prompt(qMap.get('question'));
alert(qMap.get(answer === qMap.get(qMap.get('Correct'))));
