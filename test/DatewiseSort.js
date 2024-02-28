array2 = [
  new Date("2000-07-01"),
  new Date("2023-07-01"),
  new Date("2017-07-01"),
];
console.log(array2);
array2.sort((a, b) => b - a);
console.log(array2);

newArray = [
  { date: new Date("2000-07-01") },
  { date: new Date("2023-07-01") },
  { date: new Date("2017-07-01") },
];
newArray.sort((a, b) => b.date - a.date);
console.log(newArray);

