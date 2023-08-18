"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Image.belongsTo(models.User, { foreignKey: "user_id" });
      Image.belongsToMany(models.Category, {
        through: models.ImageCategory,
        foreignKey: "image_id",
      });
    }
  }
  Image.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { notEmpty: true },
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true },
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: { notEmpty: true },
      },
      date: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true },
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true },
      },
    },
    {
      sequelize,
      modelName: "Image",
    }
  );
  return Image;
};
