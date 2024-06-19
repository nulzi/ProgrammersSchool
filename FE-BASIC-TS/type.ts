// interface Person {
//   name: string;
//   age: number;
//   sex: string;
// }

// let James: Person = {
//   name: "James",
//   age: 10,
// };

enum GenderType {
  Male,
  Female,
}

interface Person {
  name: string;
  age: number;
  gender?: GenderType;
  setName: (name: string) => void;
}

class Teacher implements Person {
  name = "Lee";
  age = 43;
  gender = GenderType.Male;
  setName(name: string): void {
    this.name = name;
  }
}
