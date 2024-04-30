const express = require("express");
const app = express();

app.listen(1234);
app.use(express.json());

const book1 = {
  name: "book1",
  author: "author1",
  publishDate: "1999.06.14",
};

const book2 = {
  name: "book2",
  author: "author2",
  publishDate: "2005.05.12",
};

const book3 = {
  name: "book3",
  author: "author3",
  publishDate: "2000.04.15",
};

const db = new Map();
db.set(1, book1);
db.set(2, book2);
db.set(3, book3);

app.get("/books", (req, res) => {
  // 1. Object.fromEntries()로 Map을 Object로 변환
  console.log(Object.fromEntries(db));
  res.json(Object.fromEntries(db));
  // console.log(JSON.stringify(Object.fromEntries(db)));
  // res.json(JSON.stringify(Object.fromEntries(db)));

  // 2. 새로운 객체 books에 db.forEach()를 통해 키-값 추가
  // const books = {};
  // db.forEach((v, k) => {
  //   books[k] = v;
  // });
  // console.log(books);
  // res.json(books);
  // console.log(JSON.stringify(books));
  // res.json(JSON.stringify(books));
});

app.get("/books/:id", function (req, res) {
  let { id } = req.params;
  id = parseInt(id);

  const book = db.get(id);
  if (db.has(id)) {
    res.json({
      id: id,
      ...book,
    });
  } else {
    res.json({
      message: `there is no ${id} data`,
    });
  }
});

app.post("/book", (req, res) => {
  const id = db.size + 1;
  db.set(id, req.body);

  res.json({
    message: `add new creater ${db.get(id).name}`,
    ...req.body,
  });
});
