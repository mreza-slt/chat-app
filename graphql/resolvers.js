module.exports = {
  Query: {
    getUsers: () => {
      const users = [
        {
          username: "alireza",
          email: "reza111@gmail.com",
        },
        {
          username: "mohammad",
          email: "mohammad111@gmail.com",
        },
      ];
      return users;
    },
  },
};
