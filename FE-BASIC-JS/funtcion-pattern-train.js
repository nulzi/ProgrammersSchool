// IIFE
(function test() {
  console.log(1);
})();

// 재귀함수
function test(arg) {
  if (arg == 2) return arg;
  return test(++arg);
}

console.log(test(1));

// 중첩함수(내부함수)
function out(arg) {
  function inner() {
    console.log(arg);
  }

  inner();
}

out(1);

// 콜백함수
function test3(arg) {
  arg();
}

test3(() => {
  console.log(3);
});
