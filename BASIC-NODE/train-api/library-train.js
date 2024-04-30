const e = require("express");
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

// GET 전체 조회
app.get("/books", (req, res) => {
  // 1. Object.fromEntries()로 Map을 Object로 변환
  // console.log(Object.fromEntries(db));
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

// GET id로 개별 조회
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

// POST 책 하나 등록(생성)
app.post("/book", (req, res) => {
  const id = db.size + 1;
  db.set(id, req.body);

  res.json({
    message: `add new book ${db.get(id).name}`,
    ...req.body,
  });
});

// DELETE id로 개별 삭제
app.delete("/books/:id", (req, res) => {
  let { id } = req.params;
  id = parseInt(id);

  const removed = db.get(id);

  if (db.delete(id)) {
    res.json({
      message: `delete book ${removed.name}`,
    });
  } else {
    res.json({
      message: `there is no data ${id}`,
    });
  }
});

// DELETE 전체 삭제
app.delete("/books", (req, res) => {
  let message = "";

  if (!db.size) {
    message = "database is already empty";
  } else {
    db.clear();

    message = "database is empty";
  }
  res.json({
    message: message,
  });
});

// PUT id로 개별 수정
app.put("/books/:id", (req, res) => {
  let { id } = req.params;
  id = parseInt(id);

  const before = db.get(id);
  const { newName } = req.body;
  if (!before) {
    res.json({
      message: `there is no data ${id}`,
    });
  } else if (before.name === newName) {
    res.json({
      message: `there is no change`,
    });
  } else {
    db.set(id, { ...before, name: newName });

    res.json({
      message: `change data ${before.name} => ${newName}`,
    });
  }
});
