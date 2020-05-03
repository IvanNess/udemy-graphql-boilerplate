import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


import prisma from '../../src/prisma'

const userOne = {
    input: {
        name: "Jen",
        email: "jen@bk.ru",
        password: bcrypt.hashSync("12345678")
    }, 
    user: undefined,
    jwt: undefined
}

const userTwo = {
    input: {
        name: "Jess",
        email: "jess@bk.ru",
        password: bcrypt.hashSync("12345678")
    }, 
    user: undefined,
    jwt: undefined
}

const seedDatabase = async()=>{
    await prisma.mutation.deleteManyUsers()

    userOne.user = await prisma.mutation.createUser({
        data:userOne.input
    })
    userOne.jwt = jwt.sign({userId: userOne.user.id}, process.env.JWT_SECRET)

    userTwo.user = await prisma.mutation.createUser({
        data:userTwo.input
    })
    userTwo.jwt = jwt.sign({userId: userTwo.user.id}, process.env.JWT_SECRET)

}

export default seedDatabase

export {userOne, userTwo}