import {gql} from "@apollo/client";

export const getAllUsers = gql`
    query {
        getAllUsers {
            id, username, age
        }
    }
`

export const getUser = gql`
    query getUserById($id: ID){
        getUserById(id: $id) {
            username, age
        }
    }
`
