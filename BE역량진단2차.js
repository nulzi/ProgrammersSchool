const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");

app.use(express.json());

let DATA_DIR = "/home/programmers/project/data/input";

function readDataFromFile(filepath) {
  try {
    const data = fs.readFileSync(filepath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error(`Error: ${filepath}`, err);
    return null;
  }
}

// 1.
app.get("/api/v1/user-info", (req, res) => {
  return res.status(200).json({
    username: "testuser",
    email: "test@example.com",
  });
});

// 2.
app.get("/api/v1/hello-world", (req, res) => {
  return res.status(200).json({
    message: "Hello, World!",
  });
});

// 3.
app.post("/api/v1/odd-or-even", (req, res) => {
  const { number } = req.body;
  const result = parseInt(number) % 2 == 0 ? "even" : "odd";

  return res.status(200).json({
    result: result,
  });
});

// 4.
app.post("/api/v1/sum", (req, res) => {
  const { number1, number2 } = req.body;
  const sum = parseInt(number1) + parseInt(number2);

  return res.status(200).json({
    sum: sum,
  });
});

// 5.
app.get("/api/v1/current-date", (req, res) => {
  const date = new Date();
  const addZero = (num) => {
    return num < 10 ? "0" + num : num;
  };
  const current_date = `${date.getFullYear()}-${addZero(
    date.getMonth() + 1
  )}-${addZero(date.getDate())}`;

  return res.status(200).json({
    current_date: current_date,
  });
});

// 6.
app.post("/api/v1/echo", (req, res) => {
  const { message } = req.body;

  return res.status(200).json({
    message: message,
  });
});

// 7.
app.get("/api/v1/posts/count", (req, res) => {
  const postsFilePath = path.join(DATA_DIR, "posts.json");
  const posts = readDataFromFile(postsFilePath);

  return res.status(200).json({
    count: posts.length,
  });
});

// 8.
app.get("/api/v1/user-email/:userId", (req, res) => {
  const { userId } = req.params;
  const usersFilePath = path.join(DATA_DIR, "users.json");
  const users = readDataFromFile(usersFilePath);
  const user = users.find((el) => el.id == parseInt(userId));

  if (user) {
    return res.status(200).json({
      email: user.email,
    });
  }

  return res.status(404).json({
    error: "User not found",
  });
});

// 9.
app.get("/api/v1/user-posts/:userId", (req, res) => {
  const { userId } = req.params;
  const postsFilePath = path.join(DATA_DIR, "posts.json");
  const posts = readDataFromFile(postsFilePath);
  const selectedPosts = posts
    .filter((el) => el.user_id == parseInt(userId))
    .sort((a, b) => b.id - a.id);

  if (selectedPosts.length) {
    return res.status(200).json(selectedPosts);
  }

  return res.status(200).json([]);
});

// 10.
app.put("/api/v1/posts/:postId", (req, res) => {
  const { postId } = req.params;
  const postsFilePath = path.join(DATA_DIR, "posts.json");
  const posts = readDataFromFile(postsFilePath);
  const post = posts.find((el) => el.id == parseInt(postId));

  if (post) {
    const { title, content } = req.body;
    const date = new Date();
    const addZero = (num) => {
      return num < 10 ? "0" + num : num;
    };
    const current_date = `${date.getFullYear()}-${addZero(
      date.getMonth() + 1
    )}-${addZero(date.getDate())}`;

    return res.status(200).json({
      ...post,
      title: `${title} - updated`,
      content: `${content} (Modified)`,
      updated_at: current_date,
    });
  }

  return res.status(404).json({
    error: "Post not found",
  });
});

// 11.
app.delete("/api/v1/comments/:commentId", (req, res) => {
  const { commentId } = req.params;
  const commentsFilePath = path.join(DATA_DIR, "comments.json");
  const comments = readDataFromFile(commentsFilePath);
  const comment = comments.find((el) => el.id == parseInt(commentId));

  if (comment) {
    return res.status(200).json({
      message: "Comment deleted successfully",
      deleted_comment_id: comment.id,
    });
  }

  return res.status(404).json({
    error: "Comment not found",
  });
});

// 12.
app.get("/api/v1/users/:userId/posts", (req, res) => {
  const { userId } = req.params;
  const usersFilePath = path.join(DATA_DIR, "users.json");
  const users = readDataFromFile(usersFilePath);
  const user = users.find((el) => el.id == parseInt(userId));

  if (user) {
    const postsFilePath = path.join(DATA_DIR, "posts.json");
    const posts = readDataFromFile(postsFilePath);
    const selectedPosts = posts.filter((el) => el.user_id == parseInt(userId));

    return res.status(200).json(selectedPosts);
  }

  return res.status(404).json({
    error: "User not found",
  });
});

// 13.
app.post("/api/v1/posts/:postId/comments", (req, res) => {
  const { user_id, content } = req.body;

  if (content) {
    const { postId } = req.params;
    const usersFilePath = path.join(DATA_DIR, "users.json");
    const users = readDataFromFile(usersFilePath);
    const user = users.find((el) => el.id == parseInt(user_id));
    const postsFilePath = path.join(DATA_DIR, "posts.json");
    const posts = readDataFromFile(postsFilePath);
    const post = posts.find((el) => el.id == parseInt(postId));

    if (user && post) {
      const commentsFilePath = path.join(DATA_DIR, "comments.json");
      const comments = readDataFromFile(commentsFilePath);
      const selectedComments = comments.filter(
        (el) => el.post_id == parseInt(postId)
      );
      const date = new Date();
      const addZero = (num) => {
        return num < 10 ? "0" + num : num;
      };
      const current_date = `${date.getFullYear()}-${addZero(
        date.getMonth() + 1
      )}-${addZero(date.getDate())}`;

      return res.status(200).json({
        id: selectedComments.length + 1,
        post_id: postId,
        user_id: user_id,
        content: content,
        created_at: current_date,
      });
    }

    return res.status(404).json({
      error: "Post or User not found",
    });
  }

  return res.status(400).json({
    error: "Comment content is required",
  });
});

// 14.
app.get("/api/v1/users/:userId/activity-report", (req, res) => {
  const { userId } = req.params;
  const usersFilePath = path.join(DATA_DIR, "users.json");
  const users = readDataFromFile(usersFilePath);
  const user = users.find((el) => el.id == parseInt(userId));

  if (user) {
    const postsFilePath = path.join(DATA_DIR, "posts.json");
    const posts = readDataFromFile(postsFilePath);
    const commentsFilePath = path.join(DATA_DIR, "comments.json");
    const comments = readDataFromFile(commentsFilePath);
    let selectedPostsCount = 0;
    let latestPost = -1;
    let selectedCommentsCount = 0;
    let latestComment = -1;

    posts.forEach((el) => {
      if (el.user_id == parseInt(userId)) {
        selectedPostsCount++;
        if (latestPost == -1) {
          latestPost = el;
        } else {
          const elDate = new Date(el.created_at);
          const latestDate = new Date(latestPost.created_at);

          if (elDate < latestDate) latestPost = el;
        }
      }
    });

    comments.forEach((el) => {
      if (el.user_id == parseInt(userId)) {
        selectedCommentsCount++;
        if (latestComment == -1) {
          latestComment = el;
        } else {
          const elDate = new Date(el.created_at);
          const latestDate = new Date(latestComment.created_at);

          if (elDate < latestDate) latestComment = el;
        }
      }
    });

    if (selectedPostsCount == 0 || selectedCommentsCount == 0) {
      return res.status(200).json({
        message: "No activity found",
      });
    }

    latestPost = {
      postId: latestPost.id,
      title: latestPost.title,
      content: latestPost.content,
      createdAt: latestPost.created_at,
    };

    latestComment = {
      commentId: latestComment.id,
      content: latestComment.content,
      createdAt: latestComment.created_at,
    };

    return res.status(200).json({
      userId: userId,
      totalPosts: selectedPostsCount,
      totalComments: selectedCommentsCount,
      recentActivity: {
        latestPost: latestPost,
        latestComment: latestComment,
      },
    });
  }

  return res.status(404).json({
    error: "User not found",
  });
});

const PORT = 5678;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
