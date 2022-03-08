const usersResolvers = require("./users")
const messageResolvers = require("./messages")

module.exports = {
    Message: {
        createdAt: (parent) => parent.createdAt.toISOString(),
    },
    Query: {
        ...usersResolvers.Query,
        ...messageResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...messageResolvers.Mutation
    }
}