const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection.js");

class Show extends Model {}

Show.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    show_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    seasons: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "Show",
  }
);

module.exports = Show;
