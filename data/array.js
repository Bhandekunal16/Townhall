const array = ["1", "2", "3"];
console.log(array);

const newArray = new Array("4", "5", "6");
console.log(newArray);

const element = newArray[1];
console.log(element);

newArray[1] = "two";
console.log(newArray);

const length = newArray.length;
console.log(length);

const addelement = newArray.push("nine");
console.log(newArray);

const removedElement = newArray.pop();
console.log(newArray);

const unshift = newArray.unshift(0);
console.log(newArray);

const removedElementShift = newArray.shift();
console.log(newArray);

const spliceAdd = newArray.splice(0, 1, 7);
console.log(newArray);

const spliceRemove = newArray.splice(1, 1);
console.log(newArray);

for (let i = 0; i < newArray.length; i++) {
  console.log(newArray[i]);
}

newArray.forEach((element) => {
  console.log(element);
});

const anotherArray = newArray.map((element) => element * 2);
console.log(anotherArray)

const filteredArray = newArray.filter((element) => typeof element === 'number');
console.log(filteredArray)

const index = newArray.indexOf(7);
console.log(index)


const includesElement = newArray.includes('four');
console.log(includesElement)
