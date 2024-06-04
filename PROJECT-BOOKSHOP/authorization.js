const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

const decodeUser = (req) => {
  try {
    const token = req.headers.authorization;

    if (token) {
      const user = jwt.verify(token, process.env.PRIVATE_KEY);

      return user;
    }

    return token;
  } catch (err) {
    console.log(err.name);
    console.log(err.message);

    return err;
  }
};

module.exports = { decodeUser };
