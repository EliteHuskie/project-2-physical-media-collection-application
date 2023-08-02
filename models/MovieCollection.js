const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection.js");

class MovieCollection extends Model {}

MovieCollection.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    movie_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Movie",
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
    modelName: "Movie_collection",
  }
);

module.exports = MovieCollection;
