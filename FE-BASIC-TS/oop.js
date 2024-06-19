var Human = /** @class */ (function () {
    function Human(name, age, gender) {
        var _this = this;
        this.getName = function () {
            console.log(_this._name);
        };
        this._name = name;
        this._age = age;
        this._gender = gender;
    }
    Object.defineProperty(Human.prototype, "name", {
        set: function (name) {
            this.name = name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Human.prototype, "age", {
        get: function () {
            return this._age;
        },
        set: function (v) {
            this._age = v;
        },
        enumerable: false,
        configurable: true
    });
    return Human;
}());
var james = new Human("james", 10, "male");
james.getName();
james.age = 11; // error
console.log(james.age);
