const { AuthenticationError, UserInputError } = require("apollo-server");
const { Message, User } = require("../../models");
const { Op } = require("sequelize")

module.exports = {

    Query: {
        getMessages: async (parent, { from }, { user }) => {
            try {
                if (!user) throw new AuthenticationError("UnAthenticated")

                const otherUser = await User.findOne({
                    where: { username: from }
                })

                if (!otherUser) throw new UserInputError("User not found")

                const usernames = [user.username, otherUser.username]

                const messages = await Message.findAll({
                    where: {
                        from: { [Op.in]: usernames },
                        to: { [Op.in]: usernames },
                    },
                    order: [['createdAt', 'DESC']],
                })

                return messages

            } catch (err) {
                console.log(err);
                throw err
            }
        }
    },
    Mutation: {
        sendMessage: async (parent, { to, content }, { user }) => {
            try {
                if (!user) throw new AuthenticationError("UnAthenticated")

                const recipient = await User.findOne({ where: { username: to } })

                if (!recipient) {
                    throw new UserInputError("User not found")
                } else if (recipient.username === user.username) {
                    throw new UserInputError("You cant message yourself")
                }

                if (content.trim() === "") {
                    throw new UserInputError("Message is empty")
                }

                const message = await Message.create({
                    from: user.username,
                    to,
                    content
                })

                return message
            } catch (err) {
                console.log(err);
                throw err
            }
        }
    },
};
