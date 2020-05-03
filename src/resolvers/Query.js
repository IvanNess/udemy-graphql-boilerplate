import getUserId from '../utils/getUserId'

const Query = {
    me: (parent, args, { request, prisma }, info) => {
        const userId = getUserId(request)
        return prisma.query.user({ where: { id: userId } }, info)
    },

    users: async (parent, args, { prisma }, info) => {
        const opArgs = {
            first: args.first,
            skip: args.skip,
            after: args.after,
            orderBy: args.orderBy
        }
        if (args.query) {
            opArgs.where = {
                name_contains: args.query
            }
        }

        const users = await prisma.query.users(opArgs, info)

        return users
    }
}

export default Query