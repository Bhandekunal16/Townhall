class Uuid {
  randomAlphabet() {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    return alphabet[randomIndex];
  }

  generateUUID = () => {
    const input = new Date().getMilliseconds().toString();
    const randomNumber = Math.floor(Math.random() * 1000);
    const randomIndex = Math.floor(Math.random() * 1000);
    const randomIndex2 = this.randomAlphabet();
    const randomIndex3 = this.randomAlphabet();
    const randomIndex4 = Math.floor(Math.random() * 1000);
    const randomIndex6 = this.randomAlphabet();
    const output = `${randomIndex}${randomIndex2}${randomIndex3}${input}${randomNumber}-${randomIndex4}${randomIndex6}`;
    return output.length < 16 ? output + "0" : output;
  };
}

module.exports = Uuid;
