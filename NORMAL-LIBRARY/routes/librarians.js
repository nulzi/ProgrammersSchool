const express = require("express");
const router = express.Router();
const mariadb = require("../mariadb");

router.use(express.json());

router.get("/", (req, res) => {
  res.send("Main");
});

router.post("/login", (req, res) => {
  const { email, pw } = req.body;
  const sql = "SELECT name FROM librarians WHERE email=? AND pw=?"; // Q. email과 pw를 한번에 검색하면 안 되는건가?
  const values = [email, pw];

  mariadb.query(sql, values, (_, results) => {
    const loginUser = results[0];

    if (loginUser) {
      res.status(200).json({
        message: `Have a nice day ${loginUser.name}`,
      });
    } else {
      // id와 pw를 틀린 경우를 따로 알려줄 경우 id의 존재 여부를
      // 확인할 수 있어서 따로 알려줄 필요가 없다.
      res.status(400).json({
        message: `Not our librarian. plz sign up first or Wrong email, pw. plz check your email, pw`,
      });
    }
  });
});

router.post("/signup", (req, res) => {
  if (req.body == {}) {
    res.status(400).json({
      message: `plz enter all data email, pw, name`,
    });
  } else {
    const { email, pw, name, ph_num } = req.body;
    const sql =
      "INSERT INTO librarians (email,pw,name,ph_num) VALUES (?,?,?,?)";
    const values = [email, pw, name, ph_num];

    mariadb.query(sql, values, (err) => {
      if (err?.code === "ER_DUP_ENTRY") {
        // email 중복 시 가입하지 못하게 막기
        res.status(403).json({
          message: `already exist id plz use other email`,
        });
      } else {
        res.status(201).json({
          message: `Welcome new librarian ${name}`,
        });
      }
    });
  }
});

router
  .route("/librarians")
  .get((req, res) => {
    const { email } = req.body;
    const sql = "SELECT * FROM librarians WHERE email = ?"; // `SELECT * FROM librarians WHERE email = "${email}"`

    mariadb.query(sql, email, (_, results) => {
      const user = results[0];

      if (user) {
        res.status(200).json({
          id: user.id,
          email: user.email,
          name: user.name,
          ph_num: user.ph_num,
        });
      } else {
        res.status(400).json({
          message: `there is no ${email} librarian`,
        });
      }
    });
  })
  .delete((req, res) => {
    let { email } = req.body;

    if (email) {
      const sql = "DELETE FROM librarians WHERE email=?";

      mariadb.query(sql, email, (_, results) => {
        if (results.affectedRows) {
          res.status(200).json({
            message: `goodbye ${email}`,
          });
        } else {
          res.status(400).json({
            message: `there is no ${email} librarian or already leave out library`,
          });
        }
      });
    } else {
      res.status(400).json({
        message: `plz enter the email what you want to remove`,
      });
    }
  });

module.exports = router;
