const { Book } = require("../models");

const bookData = [
  {
    book_name: "Life of Pi",
    author: "Yann Martel",
    description:
      "After the tragic sinking of a cargo ship, a solitary lifeboat remains bobbing on the wild, blue Pacific. The only survivors from the wreck are a sixteen-year-old boy named Pi, a hyena, a zebra (with a broken leg), a female orangutan—and a 450-pound Royal Bengal tiger. The scene is set for one of the most extraordinary and beloved works of fiction in recent years.",
  },
];

const seedBooks = () => Book.bulkCreate(bookData);

module.exports = seedBooks;
