import express from "express"
import {graphqlHTTP} from "express-graphql"
import cors from "cors"
import schema from "./schema.js"

const PORT = 727
const app = express()
app.use(express.json())
app.use(cors(

))

const users = [
    {id: 1, username: "dehw", age: 16},
    {id: 2, username: "way", age: 15}
]

const fns = {
    getAllUsers: () => {
        return users
    },
    getUserById: ({id}) => {
        return users.find(user => user.id === Number(id))
    },
    createUser: ({input}) => {
        const id = Date.now()
        const user = {id, ...input}
        users.push(user)
        return user
    }
}

app.use("/graphql", graphqlHTTP({
    graphiql: true,
    schema,
    rootValue: fns
}))

const start = async () => {
    try {
        app.listen(PORT, () => console.log(`started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

await start()