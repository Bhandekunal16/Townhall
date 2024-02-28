// normal
const obj = { key1: "vlaue1", key2: "vlaue2" };
console.log(obj);


// asign with the class 
const nextObj = new Object();
(nextObj.key1 = "one"), (nextObj.key2 = "two");
console.log(nextObj)


// get the object value
const first = nextObj.key1
console.log(first)

// get the object value
const second = nextObj['key2']
console.log(second)

// asign new value in the object
nextObj.newKey = 'newValue';
console.log(nextObj)

// delete the one key and value from the object
delete nextObj.newKey
console.log(nextObj)


// for loop for get each key value pair
let value
for (const key in nextObj) {
     value = nextObj[key];
    console.log(`${key}: ${value}`);
  }
console.log(value)

// get only key of the object 
const keyarray = Object.keys(nextObj)
console.log(keyarray)

// get only value of the object 
const valuearray = Object.values(nextObj)
console.log(valuearray)

// get both values of the object
const entriesArray = Object.entries(nextObj);
console.log(entriesArray)

// copy the any object to another object
const clonedObject = Object.assign({}, nextObj);
console.log(clonedObject)

// copy the any object to another object with spread method
const spreadObj = { ...nextObj };
console.log(spreadObj)

// properties checker
const hasProperty = nextObj.hasOwnProperty('key1');
console.log(hasProperty)

// convert to the json object
const jsonString = JSON.stringify(nextObj);
console.log(jsonString)

// convert to the normal object
const parsedObject = JSON.parse(jsonString);
console.log(parsedObject)

