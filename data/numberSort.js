let array = [1, 3, 4, 5, 8, 9, 10, 2, 6, 7];

function main() {
  array.sort((a, b) => a - b);
  return array;
}

console.log(main());

function write() {
  let newArray = [];
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    const nextElement = array[index + 1];
    const finalElement =
      nextElement !== undefined
        ? element < nextElement
          ? element
          : nextElement
        : element;
    newArray.push(finalElement);
  }
  return newArray;
}

console.log(write());
