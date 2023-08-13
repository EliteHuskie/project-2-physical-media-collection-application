const { User } = require("../models");
const bcrypt = require("bcrypt");

const userData = [
  {
    username: "sarah-test",
    password: bcrypt.hashSync("passwordtest", 10),
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
