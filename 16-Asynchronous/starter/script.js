'use strict';
// list of all web APIs available in this github repo
// https://github.com/public-apis/public-apis

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
fetch('https://restcountries.eu/rest/v2/name/india')
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error(err));

console.log('test start');
setTimeout(() => console.log('timeout callback'), 0);
console.log('next line after setTimeout');
Promise.resolve('Promise resolved').then(res => console.log(res));
console.log('test over');

// async await function
const getCountries = function (...countries) {
  let returnVal = [];
  countries.forEach(async c => {
    try {
      const cur = await fetch(`https://restcountries.eu/rest/v2/name/${c}`);
      returnVal.push(await cur.json());
    } catch (err) {
      console.error(err);
    }
  });
  return returnVal;
};
console.log(getCountries('United Kingdom', 'Germany', 'France', 'Australia '));
