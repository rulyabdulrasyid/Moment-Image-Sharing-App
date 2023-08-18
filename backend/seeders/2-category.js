"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Categories", [
      { name: "Nature", createdAt: new Date(), updatedAt: new Date() },
      { name: "Sport", createdAt: new Date(), updatedAt: new Date() },
      { name: "Food", createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Catagories", null, {
      restartIdentity: true,
      truncate: true,
      cascade: true,
    });
  },
};
