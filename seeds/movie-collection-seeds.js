const { MovieCollection } = require("../models");

const movieCollectionData = [
  {
    movie_id: 1,
    collection_id: 1,
  },
  {
    movie_id: 2,
    collection_id: 1,
  },
];

const seedMovieCollections = () =>
  MovieCollection.bulkCreate(movieCollectionData);

module.exports = seedMovieCollections;
