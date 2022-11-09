// import React from 'react'
import { useState, useEffect } from "react"
// import axios from "../../api/axios"
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate"
import TopBar from "../LayoutBar/TopBar"

const Users = () => {
    const [usersData, setUsersData] = useState()
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        let isMounted = true
        const controller = new AbortController() //cancel request id unmount

        const getData = async () => {
        try {
        const response = await axiosPrivate.get('/profile', {
          signal: controller.signal
        })
        console.log(response.data)
        isMounted && setUsersData(response.data)
         } catch (error) {
        console.log(error)
        }
    }
    getData()

    return () => {
      isMounted = false;
      controller.abort()
    }

    },[])

  return (
    <article>
      <TopBar />
        <h2>Users List</h2>
        {usersData?.length
        ? ( 
            
                usersData.map( user => {
                  return(
                    <div className="userData" key={user} >
                      Username: {user?.username} <br />
                      Firstname: {user?.firstname}<br />
                      Lastname: {user?.lastname}<br />
                      Email: {user?.email}<br />
                    </div>
                  )
                })
            
            // <ul>
            //     {usersData.map((user, i) =>
            //     <li key ={i}>{user?.firstname}</li>
            //     )}
            // </ul>
           
            
        ) : <p>No users to display</p>
        }
        <button type="submit">Logout</button>
    </article>
  )
}

export default Users