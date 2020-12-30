const jessica = {
  firstName: 'jessi',
  lastName: 'Williams',
  age: 27,
  innerObject: {
    a: 1,
    b: 2,
    c: 3,
  },
};
const marriedJessica = {
  ...jessica,
  lastName: 'Wayne',
  innerObject: { ...jessica.innerObject },
};
const anotherJessica = Object.assign({}, jessica);
anotherJessica.lastName = 'Davis';
marriedJessica.innerObject.a = 7;
anotherJessica.innerObject.b = 11;
console.table('Before marriage : ', jessica);
console.table('Another One : ', anotherJessica);
console.table('After Marriage : ', marriedJessica);
