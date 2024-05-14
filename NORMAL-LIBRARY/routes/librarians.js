const express = require("express");
const router = express.Router();
const mariadb = require("../mariadb");
const { body, param, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
router.use(express.json());

const validate = (req, res, next) => {
  const err = validationResult(req);

  if (err.isEmpty()) {
    return next();
  }

  return res.status(400).json(err.array());
};

router.get("/", (req, res) => {
  res.send("Main");
});

router.post(
  "/login",
  [
    body("email")
      .notEmpty()
      .withMessage(`plz enter the email(Email)`)
      .isEmail()
      .withMessage(`email type is Email. plz check your input`),
    body("pw")
      .notEmpty()
      .withMessage(`plz enter the pw(string)`)
      .isString()
      .withMessage(`pw type is string. plz check your input`),
    validate,
  ],
  (req, res) => {
    const { email, pw } = req.body;
    const sql = "SELECT name FROM librarians WHERE email=? AND pw=?"; // Q. email과 pw를 한번에 검색하면 안 되는건가?
    const values = [email, pw];

    mariadb.query(sql, values, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(400).end();
      }

      const loginUser = results[0];

      if (loginUser) {
        const token = jwt.sign(
          { email: loginUser.email, name: loginUser.name },
          process.env.PRIVATE_KEY
        );

        return res.status(200).json({
          message: `Have a nice day ${loginUser.name}`,
          token: token,
        });
      }
      // id와 pw를 틀린 경우를 따로 알려줄 경우 id의 존재 여부를
      // 확인할 수 있어서 따로 알려줄 필요가 없다.
      res.status(400).json({
        message: `Not our librarian. plz sign up first or Wrong email, pw. plz check your email, pw`,
      });
    });
  }
);

router.post(
  "/signup",
  [
    body("email")
      .notEmpty()
      .withMessage(`plz enter the email(Email)`)
      .isEmail()
      .withMessage(`email type is Email. plz check your input`),
    body("pw")
      .notEmpty()
      .withMessage(`plz enter the pw(string)`)
      .isString()
      .withMessage(`pw type is string. plz check your input`),
    body("name")
      .notEmpty()
      .withMessage(`plz enter the name(string)`)
      .isString()
      .withMessage(`name type is string. plz check your input`),
    body("ph_num")
      .isString()
      .withMessage(`ph_num type is string. plz check your input`),
    validate,
  ],
  (req, res) => {
    const { email, pw, name, ph_num } = req.body;
    const sql =
      "INSERT INTO librarians (email,pw,name,ph_num) VALUES (?,?,?,?)";
    const values = [email, pw, name, ph_num];

    mariadb.query(sql, values, (err) => {
      if (err?.code === "ER_DUP_ENTRY") {
        // email 중복 시 가입하지 못하게 막기
        return res.status(403).json({
          message: `already exist id plz use other email`,
        });
      }

      if (err) {
        console.log(err);
        return res.status(400).end();
      }
      res.status(201).json({
        message: `Welcome new librarian ${name}`,
      });
    });
  }
);

router
  .route("/librarians")
  .get(
    [
      body("email")
        .notEmpty()
        .withMessage(`plz enter the email(Email)`)
        .isEmail()
        .withMessage(`email type is Email. plz check your input`),
      validate,
    ],
    (req, res) => {
      const { email } = req.body;
      const sql = "SELECT * FROM librarians WHERE email = ?"; // `SELECT * FROM librarians WHERE email = "${email}"`

      mariadb.query(sql, email, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(400).end();
        }

        const user = results[0];

        if (user) {
          return res.status(200).json({
            id: user.id,
            email: user.email,
            name: user.name,
            ph_num: user.ph_num,
          });
        }
        res.status(400).json({
          message: `there is no ${email} librarian`,
        });
      });
    }
  )
  .delete(
    [
      body("email")
        .notEmpty()
        .withMessage(`plz enter the email(Email)`)
        .isEmail()
        .withMessage(`email type is Email. plz check your input`),
      validate,
    ],
    (req, res) => {
      let { email } = req.body;

      const sql = "DELETE FROM librarians WHERE email=?";

      mariadb.query(sql, email, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(400).end();
        }

        if (results.affectedRows) {
          return res.status(200).json({
            message: `goodbye ${email}`,
          });
        }
        res.status(400).json({
          message: `there is no ${email} librarian or already leave out library`,
        });
      });
    }
  );

module.exports = router;
