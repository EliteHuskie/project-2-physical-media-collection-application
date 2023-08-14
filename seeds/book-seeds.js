const { Book } = require("../models");

const bookData = [
  {
    name: "Life of Pi",
    creator: "Yann Martel",
    overview:
      "After the tragic sinking of a cargo ship, a solitary lifeboat remains bobbing on the wild, blue Pacific. The only survivors from the wreck are a sixteen-year-old boy named Pi, a hyena, a zebra (with a broken leg), a female orangutan—and a 450-pound Royal Bengal tiger. The scene is set for one of the most extraordinary and beloved works of fiction in recent years.",
    image_url:
      "https://worldofbooksblog.files.wordpress.com/2013/01/life-of-pi-book-cover1.jpg",
  },
  {
    name: "The Great Gatsby",
    creator: "F. Scott Fitzgerald",
    overview:
      "The Great Gatsby, Third novel by American author F. Scott Fitzgerald, published in 1925. Set in Jazz Age New York, it tells the tragic story of Jay Gatsby, a self-made millionaire, and his pursuit of Daisy Buchanan, a wealthy young woman whom he loved in his youth.",
    image_url:
      "https://cdn.kobo.com/book-images/bb4ae37a-8370-4c31-aea8-55a51ba734b7/166/300/False/the-great-gatsby-the-original-1925-edition-a-f-scott-fitzgerald-classic-novel.jpg",
  },
];

const seedBooks = () => Book.bulkCreate(bookData);

module.exports = seedBooks;
