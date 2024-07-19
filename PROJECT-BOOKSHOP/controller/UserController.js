const mariadb = require("../mariadb");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const pwEncoding = (pw, salt) => {
  return crypto.pbkdf2Sync(pw, salt, 10000, 10, "sha512").toString("base64");
};

const signup = (req, res) => {
  const { email, password } = req.body;
  // 비밀번호 암호화
  const salt = crypto.randomBytes(10).toString("base64");
  const hashPassword = pwEncoding(password, salt);
  const sql = `INSERT INTO  users (email, password, salt) VALUES (?,?,?)`;
  const values = [email, hashPassword, salt];

  mariadb.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    res.status(StatusCodes.CREATED).json({
      message: "signup success",
    });
  });
};

const login = (req, res) => {
  const { email, password } = req.body;
  const sql = `SELECT * FROM users WHERE email = ?`;

  mariadb.query(sql, email, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    const loginUser = results[0];
    const hashPassword = pwEncoding(password, loginUser.salt);

    if (loginUser && loginUser.password == hashPassword) {
      const token = jwt.sign(
        { email: loginUser.email, userId: loginUser.id },
        process.env.PRIVATE_KEY,
        { expiresIn: "5m", issuer: "nulzi" }
      );

      res.cookie("token", token, {
        httpOnly: true,
      });

      return res
        .status(StatusCodes.OK)
        .json({ ...results[0], token: token, email: loginUser.email });
    }

    res.status(StatusCodes.UNAUTHORIZED).json({
      message: `Not our user. plz sign up first or Wrong email, pw. plz check your email, pw`,
    });
  });
};

const requestPasswordReset = (req, res) => {
  const { email } = req.body;
  const sql = `SELECT * FROM users WHERE email = ?`;

  mariadb.query(sql, email, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    const user = results[0];
    if (user) {
      return res.status(StatusCodes.OK).json({
        email: email,
      });
    }

    res.status(StatusCodes.UNAUTHORIZED).end();
  });
};

const resetPassword = (req, res) => {
  const { email, password } = req.body;
  const salt = crypto.randomBytes(10).toString("base64");
  const hashPassword = pwEncoding(password, salt);
  const sql = `UPDATE users SET password = ?, salt = ? WHERE email = ?`;
  const values = [hashPassword, salt, email];

  mariadb.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    if (results.affectedRows) {
      return res.status(StatusCodes.OK).json({
        message: "reset2 success",
      });
    }

    res.status(StatusCodes.BAD_REQUEST).end();
  });
};

module.exports = { signup, login, requestPasswordReset, resetPassword };
