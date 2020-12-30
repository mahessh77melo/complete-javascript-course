// un-unsed max function (just for example)
/* const max = account1.movements.reduce(
  (acc, cur) => (cur > acc ? cur : acc),
  account1.movements[0]
); */
// console.log(max);

// flat and flatMap
// flat is used to flatten a deep array
const arr = [
  [1, 2, 3, 4],
  [1, 2, 3, 4, 4, 6, 7],
];
console.log(arr.flat());
// multidimensional arrays
const arr2 = [[23, 45, [1, 32]], [7, 8, 9], [[10, 24]]];
console.log(arr2.flat(2));
/* 
[
  1, 2, 3, 4, 1,
  2, 3, 4, 4, 6,
  7
]
[
  23, 45,  1, 32, 7,
   8,  9, 10, 24
]

*/
// flat map is flat cascaded to map function. increase in performance
const obj1 = {
  arr: [1, 2, 3, 4, 5, 6],
};
const obj2 = {
  arr: [1, 7, 8, 9, 5, 6],
};
const objArray = [obj1, obj2];
const cascaded = objArray.flatMap(obj => obj.arr);
console.log(cascaded);
/* [ 1, 2, 3, 4, 5, 6, 1, 7, 8, 9, 5, 6 ] */
// But only goes one level deep. If u want more than one level, go with
// flat(arg)

// SORTING
// js sorts string arrays normally. but problem arrises when it tries to sort number arrays
const arr1 = [0, 7, 5, 3, 4];
arr1.sort((a, b) => a - b);
console.log(arr1);
// Array.from()
const newArr = Array.from({ length: 7 }, (_, k) => k);
// same as writing [k for k in range(7) in python]
console.log(newArr);
