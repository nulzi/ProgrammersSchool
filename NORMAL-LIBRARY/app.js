const express = require("express");
const app = express();

app.listen(3000);

const librarianRouter = require("./routes/librarians");
const bookRouter = require("./routes/books");

app.use("/", librarianRouter);
app.use("/books", bookRouter);
