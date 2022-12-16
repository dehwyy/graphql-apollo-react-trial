import {buildSchema} from "graphql/utilities/index.js";

const schema = buildSchema(`
    type User {
        id: ID
        username: String
        age: Int
        posts: [Post]
    }
    type Post {
        id: ID
        title: String
        content: String
    }
    
    input UserInput {
        id: ID
        username: String!
        age: Int!
        posts: [PostInput]
    }
    
    input PostInput {
        id: ID
        title: String!
        content: String!
    }
    
    type Query {
        getAllUsers: [User]
        getUserById(id: ID): User
    }
    
    type Mutation {
        createUser(input: UserInput): User
    }
    
`)

export default schema