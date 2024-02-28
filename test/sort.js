const data = "kunal eknath  bhande";

const main = () => {
  const body = data;
  const sort = body.trim();
  const inbetween = sort.replace(/\s+/g, " ");
  return inbetween;
};

console.log(main());
