const { Collection } = require("../models");

const collectionData = [
  {
    collection_name: "test collection",
    user_id: 1,
  },
];

const seedCollections = () => Collection.bulkCreate(collectionData);

module.exports = seedCollections;
