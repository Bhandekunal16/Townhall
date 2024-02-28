const { Observable, of, from, interval } = require("rxjs");

observable = new Observable((subscriber) => {
  subscriber.next(main(1));
  subscriber.next(main(2));
  subscriber.next(main(3));
  setTimeout(() => {
    subscriber.next(main(4));
    subscriber.complete();
  }, 1000);
});

function main(data) {
  return `this is data ${data}`;
}

function sec() {
  let array = [];
  const value = observable.subscribe((x) => {
    array.push(x);
    console.log(array);
  });
}

function third() {
  let newArray = [];
  const value = observable.subscribe((x) => {
    newArray.push(x);

    console.log(newArray);
  });
}

sec();
third();
