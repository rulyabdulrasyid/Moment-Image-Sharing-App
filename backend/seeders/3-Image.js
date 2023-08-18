"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Images", [
      {
        user_id: 1,
        image:
          "https://images.unsplash.com/photo-1595220427358-8cf2ce3d7f89?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=876&q=80",
        title: "Ginting in Action",
        description:
          "Anthony Sinisuka Ginting is an Indonesian badminton player known for his fast, aggressive, and spirited playing style.k",
        date: "Agustus 2018",
        location: "Jakarta, Indonesia",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 2,
        image:
          "https://images.unsplash.com/photo-1599177869610-cbd40b3fa28c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
        title: "Camp on Rinjani",
        description: "people camping on green grass field during daytime",
        date: "September 2020",
        location:
          "Mount Rinjani, Sembalun Lawang, East Lombok Regency, West Nusa Tenggara, Indonesia",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Images", null, {
      restartIdentity: true,
      truncate: true,
      cascade: true,
    });
  },
};
