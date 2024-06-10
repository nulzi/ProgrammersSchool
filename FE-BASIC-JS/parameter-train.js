// default parameter
// function test(arg = 1) {
//   return arg;
// }

// console.log(test());
// console.log(test(2));

// rest parameter
function test2(arg, ...rest) {
  console.log(rest);
  return arg;
}

console.log(test2(1, 2, 3, 4));
