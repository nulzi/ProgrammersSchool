const e = require("express");
const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();

const PORT = 5678;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

let DATA_DIR = "./data/input";

app.use(express.json());
// 데이터 읽어주는 함수
function readDataFromFile(filePath) {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error: ${filePath}: `, error);
    return null;
  }
}

//1번
app.get("/api/v1/user-info", (req, res) => {
  res.status(200).json({
    username: "testuser",
    email: "test@example.com",
  });
});

//2번
app.get("/api/v1/hello-world", (req, res) => {
  res.status(200).json({
    message: "Hello, World!",
  });
});

//3번
app.post("/api/v1/odd-or-even", (req, res) => {
  let num = req.body.number;
  if (num % 2 == 1) {
    res.status(200).json({
      result: "odd",
    });
  } else {
    res.status(200).json({
      result: "even",
    });
  }
});
//4번
app.post("/api/v1/sum", (req, res) => {
  let num1 = req.body.number1;
  let num2 = req.body.number2;
  num1 = parseInt(num1);
  num2 = parseInt(num2);
  let sumnum = num1 + num2;
  res.status(200).json({
    sum: sumnum,
  });
});

//5번
app.get("api/v1/current-date", (req, res) => {
  let today = new Date();

  var year = today.getFullYear();
  var month = ("0" + (today.getMonth() + 1)).slice(-2);
  var day = ("0" + today.getDate()).slice(-2);

  let date = year + "-" + month + "-" + day;

  res.status(200).json({
    current_date: date,
  });
});

//6번
app.post("api/v1/echo", (req, res) => {
  const message1 = req.body.message;

  res.status(200).json({
    message: message1,
  });
});

//7번
app.get("/api/v1/posts/count", (req, res) => {
  const postsFilePath = path.join(DATA_DIR, "posts.json");
  const posts = readDataFromFile(postsFilePath);

  let num = 0;
  for (i = 0; i < posts.length; i++) {
    num += 1;
  }
  res.status(200).json({
    count: num,
  });
});

//8번
app.get("/api/v1/user-email/:userId", (req, res) => {
  const userId = req.params;

  const usersFilePath = path.join(DATA_DIR, "users.json");
  const users = readDataFromFile(usersFilePath);

  const user = users.find((user) => user.id === userId);
  if (user) {
    res.status(404).json({
      error: "User not found",
    });
  } else {
    let useremail = user[0].email;
    res.status(200).json({
      email: useremail,
    });
  }
});

//9번
app.get("/api/v1/user-posts/:userId", (req, res) => {
  const userId = req.params;

  const postsFilePath = path.join(DATA_DIR, "posts.json");
  const posts = readDataFromFile(postsFilePath);

  const userpost = posts.filter((post) => post.user_id === userId);
  // let post =[]
  // for(i=0;i<userpost.length;i++){
  //   post.push(
  //     userpost[i].id,
  //     userpost[i].title
  //   )
  // }
  res.status(200).json(userpost);
});

//10번
app.put("/api/v1/posts/postId", (req, res) => {
  const postId = req.params;
  const { title, content } = req.body;

  const postsFilePath = path.join(DATA_DIR, "posts.json");
  const posts = readDataFromFile(postsFilePath);

  let today = new Date();

  var year = today.getFullYear();
  var month = ("0" + (today.getMonth() + 1)).slice(-2);
  var day = ("0" + today.getDate()).slice(-2);

  let date = year + "-" + month + "-" + day;

  const post = posts.find((post) => post.id === postId);
  if (post.length == 0) {
    res.status(404).json({
      error: "Post not found",
    });
  } else {
    post.map(function (result) {
      result.tile = title;
      result.content = content;
      result.updated_at = date;
    });
    res.status(200).json(post);
  }
});

//11번
app.get("/api/v1/comments/:commentId", (req, res) => {
  const commentId = req.params;

  const commentsFilePath = path.join(DATA_DIR, "comments.json");
  const comments = readDataFromFile(commentsFilePath);

  const comment = comments.filter((comment) => comment.id === commentId);
  if (comment.length == 0) {
    res.status(404).json({
      error: "Comment not found",
    });
  } else {
    res.status(200).json({
      message: "Comment deleted successfully",
      deleted_comment_id: commentId,
    });
  }
});

//12번
app.get("/api/v1/users/:userId/posts", (req, res) => {
  const userId = req.params;

  const usersFilePath = path.join(DATA_DIR, "users.json");
  const users = readDataFromFile(usersFilePath);

  const postsFilePath = path.join(DATA_DIR, "posts.json");
  const posts = readDataFromFile(postsFilePath);

  const user = users.find((user) => user.id === userId);
  if (user.length == 0) {
    res.status(404).json({
      error: "User not found",
    });
  } else {
  }
});
