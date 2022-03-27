const glob = require("glob");
const { promisify } = require("util");

module.exports = class Utils {
  //pretty
  static pretty(str) {
    return str[0].toUpperCase() + str.slice(1).toLowerCase();
  }
  //search
  static search = promisify(glob);

  //random int
  static getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  // random array element
  static randomElement(arr) {
    return arr[this.getRandomInt(0, arr.length - 1)];
  }
  static plural(num) {
    if (num === 1) return "";
    return "s";
  }
};
