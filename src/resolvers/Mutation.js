import bcrypt from 'bcryptjs'

import getUserId from '../utils/getUserId' 
import generateToken from '../utils/generateToken'
import hashPassword from '../utils/hashPassword'

const Mutation = {
    createUser: async (parent, args, { prisma }, info) => {
        const userExists = await prisma.exists.User({ email: args.data.email })
        if (userExists)
            throw new Error('email taken.')
        const password = await hashPassword(args.data.password)
        const user = await prisma.mutation.createUser({ data: { ...args.data, password } })
        const token = generateToken(user.id)
        return { user, token }
    },

    login: async (parent, args, { prisma }, info) => {
        const user = await prisma.query.user({ where: { email: args.email } })
        if (!user)
            throw new Error('User or password is incorrect.')
        const isPasswordMatched = await bcrypt.compare(args.password, user.password)
        if (!isPasswordMatched)
            throw new Error("User or password is incorrect.")
        return {
            user,
            token: generateToken(user.id)
        }
    },

    updateUser: async(parent, args, { prisma, request }, info) => {
        const userId = getUserId(request)

        if(typeof args.data.password === 'string'){
            args.data.password = await hashPassword(args.data.password)
        }

        return prisma.mutation.updateUser({
            where: { id: userId },
            data: args.data
        }, info)
    },

    deleteUser: async (parent, args, { prisma, request }, info) => {
        const userId = getUserId(request)

        const userExists = await prisma.exists.User({ id: userId })
        if (!userExists)
            throw new Error('user not found')
        return prisma.mutation.deleteUser({ where: { id: userId } }, info)
    }
}

export default Mutation