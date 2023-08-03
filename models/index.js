// import models
const User = require("./User");
const Collection = require("./Collection");
const Movie = require("./Movie");
const Show = require("./Show");
const Book = require("./Book");
const MovieCollection = require("./MovieCollection");
const ShowCollection = require("./ShowCollection");
const BookCollection = require("./BookCollection");

// Collection belongs to User
Collection.belongsTo(User, {
  foreignKey: "user_id",
});

// Users can have many Collections
User.hasMany(Collection, {
  foreignKey: "user_id",
});

// Movies can be in many Collections and Collections can have many Movies
Movie.belongsToMany(Collection, {
  through: MovieCollection,
  foreignKey: "movie_id",
});

Collection.belongsToMany(Movie, {
  through: MovieCollection,
  foreignKey: "collection_id",
});

// Shows can be in many Collections and Collections can have many Shows
Show.belongsToMany(Collection, {
  through: ShowCollection,
  foreignKey: "show_id",
});

Collection.belongsToMany(Show, {
  through: ShowCollection,
  foreignKey: "collection_id",
});

// Books can be in many Collections and Collections can have many Books
Book.belongsToMany(Collection, {
  through: BookCollection,
  foreignKey: "book_id",
});

Collection.belongsToMany(Book, {
  through: BookCollection,
  foreignKey: "collection_id",
});

module.exports = {
  User,
  Collection,
  Movie,
  Show,
  Book,
  MovieCollection,
  ShowCollection,
  BookCollection,
};
