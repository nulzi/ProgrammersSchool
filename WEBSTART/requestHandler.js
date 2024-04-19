const mariadb = require("./database/connect/mariadb");

function main(response) {
  console.log("main");

  mariadb.query("select * from product", function (err, rows) {
    console.log(rows);
  });

  response.writeHead(200, { "Content-Type": "text/html" });
  response.write("Main page");
  response.end();
}

function login(response) {
  console.log("login");

  response.writeHead(200, { "Content-Type": "text/html" });
  response.write("Login page");
  response.end();
}

function favicon(response) {
  console.log("favicon");
}

let handle = {};
handle["/"] = main;
handle["/login"] = login;
handle["/favicon.ico"] = favicon;

exports.handle = handle;
