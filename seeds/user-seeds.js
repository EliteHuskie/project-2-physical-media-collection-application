const { User } = require("../models");

const userData = [
  {
    username: "sarah-test",
    password: "passwordtest",
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
