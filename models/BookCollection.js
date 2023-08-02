const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection.js");

class BookCollection extends Model {}

BookCollection.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    book_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Book",
        key: "id",
      },
    },
    collection_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Collection",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "Book_collection",
  }
);

module.exports = BookCollection;
