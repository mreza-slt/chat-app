const bcrypt = require("bcryptjs");
const { AuthenticationError, UserInputError } = require("apollo-server");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const { JWT_SECRET } = require("../../config/env.json");
const { User, Message } = require("../../models");

module.exports = {
    Query: {
        getUsers: async (_, __, { user }) => {
            try {
                if (!user) throw new AuthenticationError("UnAthenticated")

                let users = await User.findAll({
                    attributes: ['username', 'imageUrl', 'createdAt'],
                    where: { username: { [Op.ne]: user.username } },
                });

                const allUserMessages = await Message.findAll({
                    where: {
                        [Op.or]: [{ from: user.username }, { to: user.username }]
                    },
                    order: [['createdAt', 'DESC']]
                })

                users = users.map(otherUser => {
                    const latestMessage = allUserMessages.find(m => m.from === otherUser.username || m.to === otherUser.username
                    )
                    otherUser.latestMessage = latestMessage
                    return otherUser
                })
                return users;
            } catch (err) {
                throw err;
            }
        },
        login: async (_, args) => {
            const { username, password } = args;
            let errors = {};

            try {
                if (username.trim() === "") {
                    errors.username = "username must not be empty!";
                }

                if (password === "") errors.password = "password must not be empty!";

                if (Object.keys(errors).length > 0) {
                    throw new UserInputError("bad input", { errors });
                }

                const user = await User.findOne({ where: { username } });

                if (!user) {
                    errors.username = "user not found";
                }

                const currectPassword = await bcrypt.compare(password, user.password);

                if (!currectPassword) {
                    errors.password = "password is incurrect";
                    throw new UserInputError("password is incurrect", { errors });
                }

                const token = jwt.sign(
                    {
                        username,
                    },
                    JWT_SECRET,
                    { expiresIn: 60 * 60 }
                );

                return {
                    ...user.toJSON(),
                    createdAt: user.createdAt.toISOString(),
                    token,
                };
            } catch (err) {
                console.log(err);
                throw err;
            }
        },
    },
    Mutation: {
        register: async (_, args) => {
            let { username, email, password, confirmPassword } = args;

            let errors = {};

            try {
                // validate input data
                if (email.trim() === "") errors.email = "Email must not be empty";
                if (username.trim() === "")
                    errors.username = "Username must not be empty";
                if (password.trim() === "")
                    errors.password = "Password must not be empty";
                if (confirmPassword.trim() === "")
                    errors.confirmPassword = "repeat must not be empty";

                if (password !== confirmPassword)
                    errors.confirmPassword = "passwords must match";

                // // check email / username is exists
                // const userByUsername = await User.findOne({ where: { username } });
                // const userByEmail = await User.findOne({ where: { email } });

                // if (userByUsername) errors.username = `${username} is taken`;
                // if (userByEmail) errors.email = `${email} is taken`;

                if (Object.keys(errors).length > 0) {
                    throw errors;
                }

                // hash password
                password = await bcrypt.hash(password, 6);

                // create user
                const user = await User.create({
                    username,
                    email,
                    password,
                    confirmPassword,
                });
                return user;

            } catch (err) {
                console.log(err);
                if (err.name === "SequelizeUniqueConstraintError") {
                    err.errors.forEach(
                        (e) => (errors[e.path] = `${e.path} is already taken`)
                    );
                } else if (err.name === "SequelizeValidationError") {
                    err.errors.forEach((e) => (errors[e.path] = e.message));
                }
                throw new UserInputError("bad input", { errors });
            }
        },

    },
};
