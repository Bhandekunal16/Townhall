class PersonService {
  constructor() {}

  array = [];
  greet(name, age) {
    this.array.push({ name: name, age: age });
    return this.array;
  }
}

module.exports = PersonService;
