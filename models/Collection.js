const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection.js");

class Collection extends Model {}

Collection.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    collection_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue:
        "https://res.cloudinary.com/media-collection-cloud/image/upload/v1691532209/sarah-test/test%20collection.png",
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "User",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "Collection",
  }
);

module.exports = Collection;
