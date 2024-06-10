// 일급 객체인 함수는 함수의 실제 매개변수가 될 수 있다.
// function test(arg) {
//   arg();
// }

// function callback() {
//   console.log("callback");
// }

// test(callback);

// 일급 객체인 함수는 함수의 반환값이 될 수 있다.
// function test(arg) {
//   return arg;
// }

// function callback() {
//   console.log("callback");
// }

// test(callback)();

// 일급 객체인 함수는 할당명령문의 대상이 될 수 있다.
const test = function (arg) {
  return arg;
};

const test2 = test;

// 일급객체인 함수는 동일비교의 대상이 될 수 있다.
console.log(test == test2);
console.log(test(1) == 1);
