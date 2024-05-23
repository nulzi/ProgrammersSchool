const mariadb = require("../mariadb");
const { StatusCodes } = require("http-status-codes");

const getCategoryList = (req, res) => {
  let sql = `SELECT * FROM categories`;

  mariadb.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }

    if (results.length) {
      return res.status(StatusCodes.OK).json(results);
    }

    res.status(StatusCodes.NOT_FOUND).end();
  });
};

module.exports = { getCategoryList };
