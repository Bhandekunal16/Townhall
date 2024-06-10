class SortService {
  async write(data, key) {
    try {
      let item;
      data !== undefined
        ? (item = data.sort((a, b) => a - b))
        : (item = `error : property error : ${key} replace this with data!`);
      let check;
      check = item.includes("error") ? true : false;
      let flag;
      check == true ? (flag = false) : (flag = true);
      return { value: item, status: flag };
    } catch (error) {
      return { res: error, status: false, msg: "error" };
    }
  }
}

module.exports = SortService;
