'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("messages", [
      {
        uuid: "3a7e5f2d-174a-4bfd-a924-a3de58f11eee",
        from: "reza",
        to: "ali",
        content: "hello how are you?",
        createdAt: "2022-03-09 08:34:23",
        updatedAt: "2022-03-09 08:35:24"
      },
      {
        uuid: "20c338cc-6dce-49ba-a466-0fde018101ab",
        from: "reza",
        to: "user",
        content: "hello user how are you?",
        createdAt: "2022-03-09 08:55:41",
        updatedAt: "2022-03-09 08:35:24"
      },
      {
        uuid: "fa76a73c-928d-4d53-8579-667f6f1b19b3",
        from: "reza",
        to: "user",
        content: "hello user how are you?",
        createdAt: "2022-03-09 08:45:40",
        updatedAt: "2022-03-09 08:35:24"
      },
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("messages", null, {})
  }
};
