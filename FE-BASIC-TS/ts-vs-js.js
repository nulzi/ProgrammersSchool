// function plusJs(a,b) {
//   return a+b;
// }
// console.log(plusJs(5,3));
function plusTs(a, b) {
    return a + b;
}
console.log(plusTs(6, 3));
var a = 1;
a = +"2";
// interface Person {
//   name: string;
//   age: number;
//   sex: string;
// }
// let James: Person = {
//   name: "James",
//   age: 10,
// };
var GenderType;
(function (GenderType) {
    GenderType[GenderType["Male"] = 0] = "Male";
    GenderType[GenderType["Female"] = 1] = "Female";
})(GenderType || (GenderType = {}));
var Teacher = /** @class */ (function () {
    function Teacher() {
        this.name = "Lee";
        this.age = 43;
        this.gender = GenderType.Male;
    }
    Teacher.prototype.setName = function (name) {
        this.name = name;
    };
    return Teacher;
}());
