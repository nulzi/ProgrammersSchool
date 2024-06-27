const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

// JSON 파싱 미들웨어
app.use(express.json());

// 데이터 경로 - users / posts / comments
let DATA_DIR = "./data/input";

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

// 1번.
app.get("/api/v1/user-info", (req, res) => {
  res.status(200).json({
    username: "testuser",
    email: "test@example.com",
  });
});

// 2번.
app.get("/api/v1/hello-world", (req, res) => {
  res.status(200).json({
    message: "Hello, World!",
  });
});

// 3번.
app.post("/api/v1/odd-or-even", (req, res) => {
  const { number } = req.body;

  if (parseInt(number) % 2 == 0) {
    res.status(200).json({
      result: "even",
    });
  } else {
    res.status(200).json({
      result: "odd",
    });
  }
});

// 4번.
app.post("/api/v1/sum", (req, res) => {
  const { number1, number2 } = req.body;

  res.status(200).json({
    sum: number1 + number2,
  });
});

// 5번.
app.get("/api/v1/current-date", (req, res) => {
  let now = new Date();
  let year = now.getFullYear(); // 년
  let month = (now.getMonth() + 1).toString().padStart(2, "0"); // 월
  let date = now.getDate().toString().padStart(2, "0"); // 일

  let YYYY_MM_DD = `${year}-${month}-${date}`;
  res.status(200).json({
    current_date: YYYY_MM_DD,
  });
});

// 6번.
app.post("/api/v1/echo", (req, res) => {
  const { message } = req.body;

  res.status(200).json({
    message: message,
  });
});

// 7번.
app.get("/api/v1/posts/count", (req, res) => {
  const postsFilePath = path.join(DATA_DIR, "posts.json");
  const posts = readDataFromFile(postsFilePath);
  res.status(200).json({
    count: posts.length,
  });
});

// 8번.
app.get("/api/v1/user-email/:userId", (req, res) => {
  const { userId } = req.params;
  const usersFilePath = path.join(DATA_DIR, "users.json");
  const users = readDataFromFile(usersFilePath);

  let index = 0;
  while (index < users.length) {
    if (users[index].id == userId) {
      return res.status(200).json({
        email: users[index].email,
      });
    }
    index++;
  }

  res.status(404).json({
    error: "User not found",
  });
});

// 9번.
app.get("/api/v1/user-posts/:userId", (req, res) => {
  const { userId } = req.params;
  const postsFilePath = path.join(DATA_DIR, "posts.json");
  const posts = readDataFromFile(postsFilePath);

  let results = [];
  let index = posts.length - 1;
  while (index >= 0) {
    if (posts[index].user_id == userId) {
      results.push({
        id: posts[index].id,
        title: posts[index].title,
        content: posts[index].content,
      });
    }
    index--;
  }

  res.json(results);
});

// 10번.
app.put("/api/v1/posts/:postId", (req, res) => {
  const { postId } = req.params;
  const { title, content } = req.body;
  const postsFilePath = path.join(DATA_DIR, "posts.json");
  const posts = readDataFromFile(postsFilePath);

  let index = 0;
  while (index < posts.length) {
    if (posts[index].id == postId) {
      let now = new Date();
      let year = now.getFullYear(); // 년
      let month = (now.getMonth() + 1).toString().padStart(2, "0"); // 월
      let date = now.getDate().toString().padStart(2, "0"); // 일

      let YYYY_MM_DD = `${year}-${month}-${date}`;
      return res.status(200).json({
        id: posts[index].id,
        title: title + " - updated",
        content: content + " (Modified)",
        user_id: posts[index].user_id,
        created_at: posts[index].created_at,
        updated_at: YYYY_MM_DD,
      });
    }
    index++;
  }

  res.status(404).json({
    error: "Post not found",
  });
});

// 11번.
app.delete("/api/v1/comments/:commentId", (req, res) => {
  const { commentId } = req.params;
  const commentsFilePath = path.join(DATA_DIR, "comments.json");
  const comments = readDataFromFile(commentsFilePath);

  let index = 0;
  while (index < comments.length) {
    if (comments[index].id == commentId) {
      return res.status(200).json({
        message: "Comment deleted successfully",
        deleted_comment_id: comments[index].id,
      });
    }
    index++;
  }

  res.status(404).json({
    error: "Comment not found",
  });
});

// 12번.
app.get("/api/v1/users/:userId/posts", (req, res) => {
  const { userId } = req.params;
  const postsFilePath = path.join(DATA_DIR, "posts.json");
  const posts = readDataFromFile(postsFilePath);

  let results = [];
  let index = 0;
  while (index < posts.length) {
    if (posts[index].user_id == userId) {
      results.push({
        id: posts[index].id,
        title: posts[index].title,
        content: posts[index].content,
        created_at: posts[index].created_at,
      });
    }
    index++;
  }

  if (results.length) {
    res.json(results);
  } else {
    res.status(404).json({
      error: "User not found",
    });
  }
});

// 13번.
app.post("/api/v1/posts/:postId/comments", (req, res) => {});

// 14번.
app.get("/api/v1/users/:userId/activity-report", (req, res) => {});

const PORT = 5678;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
