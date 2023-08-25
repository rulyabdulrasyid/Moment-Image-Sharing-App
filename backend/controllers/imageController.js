const {
  Image,
  Category,
  User,
  ImageCategory,
  sequelize,
} = require("../models");

class ImageController {
  static async getAll(req, res, next) {
    try {
      const data = await Image.findAll({ include: [User] });
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async getOne(req, res, next) {
    const { id } = req.params;
    try {
      const data = await Image.findOne({
        where: { id },
        include: [User, Category],
      });
      if (data) {
        res.status(200).json(data);
      } else {
        throw { name: "ErrorNotFound" };
      }
    } catch (err) {
      next(err);
    }
  }

  static async create(req, res, next) {
    const userId = req.user.id;
    const { image, title, description, date, location, category_id } = req.body;

    try {
      const newImage = await sequelize.transaction(async (t) => {
        const createImage = await Image.create(
          {
            user_id: userId,
            image,
            title,
            description,
            date,
            location,
          },
          { transaction: t }
        );

        await ImageCategory.create(
          { image_id: createImage.id, category_id },
          { transaction: t }
        );
        return createImage;
      });
      res.status(201).json(newImage);
    } catch (err) {
      next(err);
    }
  }

  static async update(req, res, next) {
    const userId = req.user.id;
    const { id } = req.params;
    const { image, title, description, date, location, category_id } = req.body;
    try {
      await sequelize.transaction(async (t) => {
        const [updateImageCount, [updateImage]] = await Image.update(
          {
            user_id: userId,
            image,
            title,
            description,
            date,
            location,
          },
          { where: { id }, returning: true, transaction: t }
        );
        await ImageCategory.update(
          { category_id },
          { where: { image_id: id }, transaction: t }
        );
        res.status(200).json(updateImage);
      });
    } catch (err) {
      next(err);
    }
  }

  static async delete(req, res, next) {
    const imageId = req.params.id;
    const userId = req.user.id;
    try {
      await sequelize.transaction(async (t) => {
        await ImageCategory.destroy({
          where: { image_id: imageId },
          transaction: t,
        });
        const deleteImage = await Image.destroy({
          where: { id: imageId, user_id: userId },
          transaction: t,
        });
        return deleteImage;
      });
      res.status(200).json({ message: `Image deleted successfully` });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ImageController;
