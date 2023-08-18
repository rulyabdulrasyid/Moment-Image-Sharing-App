"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ImageCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ImageCategory.belongsTo(models.Image, { foreignKey: "image_id" });
      ImageCategory.belongsTo(models.Category, { foreignKey: "category_id" });
    }
  }
  ImageCategory.init(
    {
      image_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { notEmpty: true },
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { notEmpty: true },
      },
    },
    {
      sequelize,
      modelName: "ImageCategory",
    }
  );
  return ImageCategory;
};
