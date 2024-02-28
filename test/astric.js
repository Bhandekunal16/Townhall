function left(n) {
  let asterisks;
  for (let j = 0; j <= n; j++) {
    asterisks = "";
    for (let i = 1; i <= j; i++) {
      asterisks += "*";
    }
  }
}

right = (n) => {
  let whiteSpace = "";
  let newText;
  for (let index = 1; index <= n; index++) {
    whiteSpace += " ";
  }
  let asterisks = "";
  for (let i = whiteSpace.length; i > 0; i--) {
    newText = whiteSpace.substring(0, i - 1) + (asterisks += "*");
  }
};
