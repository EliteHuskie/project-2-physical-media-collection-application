const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection.js");

class ShowCollection extends Model {}

ShowCollection.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    show_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Show",
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
    modelName: "Show_collection",
  }
);

module.exports = ShowCollection;
