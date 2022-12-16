import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {useMutation, useQuery} from "@apollo/client";
import {getAllUsers, getUser} from "./query/user";
import {createUser} from "./mutations/user";

const DivCenter = styled.div`
  margin: 0 auto;
  width: 400px;
  padding: 100px 0 0 0;
`
const Form = styled.form`
  padding: 20px;
  background-color: beige;
  text-align: center;
`
const Input = styled.input`
  padding: 10px 20px;
  border: 2px solid lightblue;
  font-size: 25px;
  margin: 0 0 5px 0;
`
const Button = styled.button`
  font-size: 25px;
  background-color: white;
  margin: 15px;
  border: 2px solid gray;
  position: relative;
  top: 0;
  &:hover {
    cursor: pointer;
  }
  &:active {
    top: 1px;
  }
`
const UsersDiv = styled.div`
  padding: 20px;
`
const UserDiv = styled.div`
  font-size: 25px;
`

interface user {
    id?: number | string
    username?: string
    age?: number
    __typename: string
    post?: {title?: string, content?: string, id?: number | string}
}

const App = () => {
    const {data, loading, error, refetch} = useQuery(getAllUsers)
    const {data: userData} = useQuery(getUser, {
        variables: {
            id: 1
        }
    })
    console.log(userData)
    const [newUser] = useMutation(createUser)
    const [users, setUsers] = useState<user[]>([])
    const [username, setUsername] = useState<string>("")
    const [age, setAge] = useState<number>(0)
    useEffect(() => {
        if (!loading) {
            setUsers(data.getAllUsers)
        }
    }, [data])
    const addUser = () => {
        newUser({
            variables: {
                input: {
                    username, age
                }
            }
        }).then(data => {
            setUsername('')
            setAge(0)
        })
    }
    const getAll = () => {
        refetch()
    }
    return (
        <DivCenter>
            <Form onSubmit={e => e.preventDefault()}>
                <Input value={username} onChange={e => setUsername(e.target.value)} type="text" />
                <Input value={age} onChange={e => setAge(Number(e.target.value))} type="number" />
                <div>
                    <Button onClick={addUser}>Cоздать</Button>
                    <Button onClick={() => getAll()}>Получить</Button>
                </div>
            </Form>
            <UsersDiv>
                {users.map(user => (
                    <UserDiv key={user.id}>{user.id} {user.username} {user.age}</UserDiv>
                ))}
            </UsersDiv>
        </DivCenter>
    );
};

export default App;