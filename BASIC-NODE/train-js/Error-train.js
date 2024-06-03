let error = new Error("대장 에러 객체");
let syntaxError = new SyntaxError("구문 에러 객체");
let referencedError = new ReferenceError("참조 애러 객체");

console.log(error.name);
console.log(error.message);
console.log(error.stack);
