const express = require("express");
const app = express();
const { faker, fa } = require("@faker-js/faker");

app.get("/fake/users", (req, res) => {
  const { num } = req.query;
  const users = [];

  for (let i = 0; i < parseInt(num); i++) {
    users.push({
      email: faker.internet.email(),
      password: faker.internet.password(),
      fullName: faker.person.fullName(),
      ph_num: faker.helpers.fromRegExp(/010-[0-9]{4}-[0-9]{4}/),
    });
  }

  return res.status(200).json(users);
});

app.listen(3002);
