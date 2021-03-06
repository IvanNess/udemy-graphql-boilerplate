import {gql} from 'apollo-boost'

const createUser = gql`mutation($data:createUserInput!){
    createUser(data:$data){
        user{
            id
            name
            email
        }
        token
    }
}`

const getUsers = gql`query{
    users{
        id
        name
        email
    }
}`

const login = gql`mutation($email: String!, $password: String!){
    login(
        email: $email,
        password: $password
    ){
        user{
            id
            name
            email
        }
        token
    }
}`

const getProfile = gql`query{
    me{
        id
        name
        email
    }
}`

export {
    createUser,
    getUsers,
    login,
    getProfile
}
