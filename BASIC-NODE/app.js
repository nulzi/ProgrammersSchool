const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(express.json()); // req.body의 내용 가져오는 모듈
app.post("/test", (req, res) => {
  console.log(req.body.message);

  res.json({
    title: "post test",
    // message: req.body.message,
    ...req.body,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
