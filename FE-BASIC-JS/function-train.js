function test() {
  return 1;
}

const test = function () {
  return 1;
};

const test = new Function(undefined, "return 1");

const test = () => 1;
