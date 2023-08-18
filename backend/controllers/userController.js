const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserController {
  static async getAll(req, res, next) {
    try {
      const data = await User.findAll();
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async signin(req, res, next) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ where: { username } });
      if (!user) {
        throw { name: "InvalidCredential" };
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        throw { name: "InvalidCredential" };
      }
      const token = jwt.sign(
        {
          id: user.id,
          username: user.username,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );
      res.status(200).json({ token });
    } catch (err) {
      next(err);
    }
  }

  static async signup(req, res, next) {
    try {
      const { firstname, lastname, username, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        firstname,
        lastname,
        username,
        password: hashedPassword,
      });
      res.status(201).json(user);
    } catch (err) {
      next(err);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { firstname, lastname, username, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const [updateRowsCount, [updateUser]] = await User.update(
        {
          firstname,
          lastname,
          username,
          password: hashedPassword,
        },
        { where: { id }, returning: true }
      );
      if (updateRowsCount !== 1) {
        throw { name: "InvalidCredential" };
      }
      res.status(200).json(updateUser);
    } catch (err) {
      next(err);
    }
  }
  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const user = await User.findOne({ where: { id } });
      const deleteRowsCount = await User.destroy({ where: { id } });
      if (deleteRowsCount !== 1) {
        throw { name: "InvalidCredential" };
      }
      res.status(200).json({ message: `User ${user.firstname} was deleted` });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
