const seedUsers = require("./user-seeds");
const seedCollections = require("./collecion-seeds");
const seedMovies = require("./movie-seeds");
const seedShows = require("./show-seeds");
const seedBooks = require("./book-seeds");

const sequelize = require("../config/connection");

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log("\n----- DATABASE SYNCED -----\n");
  await seedUsers();
  console.log("\n----- USERS SEEDED -----\n");

  await seedCollections();
  console.log("\n----- COLLECTIONS SEEDED -----\n");

  await seedMovies();
  console.log("\n----- MOVIES SEEDED -----\n");

  await seedShows();
  console.log("\n----- SHOWS SEEDED -----\n");

  await seedBooks();
  console.log("\n----- BOOKS SEEDED -----\n");

  process.exit(0);
};

seedAll();
