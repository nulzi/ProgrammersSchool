type Gender = "male" | "female";

class Human {
  private _name: string;
  private _age: number;
  private _gender: Gender | undefined;

  constructor(name: string, age: number, gender?: Gender) {
    this._name = name;
    this._age = age;
    this._gender = gender;
  }

  getName = (): void => {
    console.log(this._name);
  };
  set name(name: string) {
    this.name = name;
  }

  get age(): number {
    return this._age;
  }

  set age(v: number) {
    this._age = v;
  }
}

let james = new Human("james", 10, "male");
james.getName();

james.age = 11; // error
console.log(james.age);
