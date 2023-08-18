"use strict";

const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", [
      {
        firstname: "ruly",
        lastname: "rasyid",
        username: "admin",
        password: await bcrypt.hash("admin", 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstname: "ruly2",
        lastname: "rasyid2",
        username: "admin2",
        password: await bcrypt.hash("admin2", 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {
      restartIdentity: true,
      truncate: true,
      cascade: true,
    });
  },
};
