let nodejsBook = {
  title: "Node.js를 공부해보자",
  price: 20000,
  description: "이 책을 활용하면 Node.js를 마스터 할 수 있음",
};

function print(book) {
  console.log(book.title);
  console.log(book.price);
  console.log(book.description);
}

print(nodejsBook);
