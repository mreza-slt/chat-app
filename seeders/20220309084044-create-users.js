'use strict';

const bcrypt = require("bcryptjs")

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const password = await bcrypt.hash("123456", 6);
    const createdAt = new Date()
    const updatedAt = createdAt

    await queryInterface.bulkInsert("users", [
      {
        username: "reza",
        email: "reza@gmail.com",
        password,
        imageUrl: "https://parsiday.com/wp-content/uploads/2019/05/aks-profile-1.jpg",
        createdAt,
        updatedAt
      },
      {
        username: "ali",
        email: "ali@gmail.com",
        password,
        imageUrl: "https://parsiday.com/wp-content/uploads/2019/05/aks-profile-1.jpg",
        createdAt,
        updatedAt
      },
      {
        username: "mohammad",
        email: "mohammad@gmail.com",
        password,
        imageUrl: "https://parsiday.com/wp-content/uploads/2019/05/aks-profile-1.jpg",
        createdAt,
        updatedAt
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {})
  }
};
