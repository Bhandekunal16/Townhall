const promise1 = new Promise((resolve, reject) => {
  const obj = { name: "jon", lastName: "doe" };
  obj.age = 23;
  return resolve(obj);
});

const promise2 = new Promise((resolve, reject) => {
  const obj = { name: "jon2", lastName: "doe2" };
  obj.age = 23;
  return resolve(obj);
});

const promise3 = new Promise((resolve, reject) => {
  const obj = { name: "jon3", lastName: "doe3" };
  obj.age = 23;
  return resolve(obj);
});

Promise.all([promise1, promise2, promise3])
  .then((values) => {
    console.log("All promises resolved:", values);
  })
  .catch((error) => {
    console.log("One of the promises was rejected:", error);
  });
