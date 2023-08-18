const { Category, Image, User } = require("../models");

class CategoryController {
  static async getAll(req, res, next) {
    try {
      const data = await Category.findAll();
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async getOne(req, res, next) {
    const { id } = req.params;
    try {
      const data = await Category.findOne({
        where: { id },
        include: [Image],
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
    const { name } = req.body;
    try {
      const data = await Category.create({ name });
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async update(req, res, next) {
    const { id } = req.params;
    const { name } = req.body;
    try {
      const updateCategory = await Category.update(
        { name },
        {
          where: { id },
          returning: true,
        }
      );
      res.status(200).json(updateCategory);
    } catch (err) {
      next(err);
    }
  }

  static async delete(req, res, next) {
    const { id } = req.params;
    try {
      const data = await Category.destroy({ where: { id } });
      res.status(200).json({ message: `Content deleted successffuly` });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = CategoryController;
