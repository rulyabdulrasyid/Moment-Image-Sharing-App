"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("ImageCategories", [
      {
        image_id: 1,
        category_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        image_id: 2,
        category_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("ImageCategories", {
      restartIdentity: true,
      truncate: true,
      cascade: true,
    });
  },
};
