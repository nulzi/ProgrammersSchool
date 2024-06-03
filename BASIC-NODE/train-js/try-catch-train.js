let string = '{ "num1":1}';

try {
  username;
  let json = JSON.parse(string);
  if (!json.name) {
    throw new SyntaxError("입력값에 이름이 없습니다.");
  } else {
    console.log(json.name);
  }
} catch (err) {
  console.log(err.name);
  console.log(err.message);
}
