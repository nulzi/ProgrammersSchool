const fs = require("fs");
const main_view = fs.readFileSync("./main.html", "utf-8");
const main_css = fs.readFileSync("./main.css", "utf-8");
const orderlist_view = fs.readFileSync("./orderlist.html", "utf-8");

const mariadb = require("./database/connect/mariadb");

function main(response) {
  console.log("main");

  mariadb.query("select * from product", function (err, rows) {
    console.log(rows);
  });

  response.writeHead(200, { "Content-Type": "text/html" });
  response.write(main_view);
  response.end();
}

function mainCss(response) {
  response.writeHead(200, { "Content-Type": "text/css" });
  response.write(main_css);
  response.end();
}

function order(response, productId) {
  response.writeHead(200, { "Content-Type": "text/html" });

  mariadb.query(
    `insert into orderlist values ("${productId}","${new Date().toLocaleDateString()}")`,
    function (err, rows) {
      console.log(rows);
    }
  );

  response.write(
    '<a href="/">go home</a><br><a href="/orderlist">order list</a>'
  );
  response.end();
}

function orderlist(response) {
  response.writeHead(200, { "Content-Type": "text/html" });

  mariadb.query(`select * from orderlist`, function (err, rows) {
    response.write(orderlist_view);

    rows.forEach((el) => {
      response.write(`<tr>
      <td>${el.product_id}</td>
      <td>${el.order_data}</td>
      </tr>`);
    });

    response.write("</table>");
    response.end();
  });
}

function favicon(response) {
  console.log("favicon");
}

function racket1(response) {
  fs.readFile("./img/racket1.png", function (err, data) {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(data);
    response.end();
  });
}
function racket2(response) {
  fs.readFile("./img/racket2.png", function (err, data) {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(data);
    response.end();
  });
}
function racket3(response) {
  fs.readFile("./img/racket3.png", function (err, data) {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(data);
    response.end();
  });
}

let handle = {};
handle["/"] = main;
handle["/main.css"] = mainCss;
handle["/order"] = order;
handle["/orderlist"] = orderlist;
handle["/favicon.ico"] = favicon;

// image directory
handle["/img/racket1.png"] = racket1;
handle["/img/racket2.png"] = racket2;
handle["/img/racket3.png"] = racket3;

exports.handle = handle;
