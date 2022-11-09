// import React from 'react'
import { useState, useEffect } from "react"
// import axios from "../../api/axios"
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate"
import TopBar from "../LayoutBar/TopBar"

const Users = () => {
    const [users, setUsers] = useState()
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        let isMounted = true
        const controller = new AbortController() //cancel request id unmount

        const getUsers = async () => {
        try {
        const response = await axiosPrivate.get('/users', {
          signal: controller.signal
        })
        console.log(response.data)
        isMounted && setUsers(response.data)
         } catch (error) {
        console.log(error)
        }
    }
    getUsers()

    return () => {
      isMounted = false;
      controller.abort()
    }

    },[])

  return (
    <article>
      <TopBar />
        <h2>Users List</h2>
        {users?.length
        ? (
            <ul>
                {users.map((user, i) =>
                <li key ={i}>{user?.username}</li>)}
            </ul>
        ) : <p>No users to display</p>
        }
    </article>
  )
}

export default Users