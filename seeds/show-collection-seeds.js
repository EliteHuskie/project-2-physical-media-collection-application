const { ShowCollection } = require("../models");

const showCollectionData = [
  {
    show_id: 1,
    collection_id: 1,
  },
];

const seedShowCollections = () => ShowCollection.bulkCreate(showCollectionData);

module.exports = seedShowCollections;
