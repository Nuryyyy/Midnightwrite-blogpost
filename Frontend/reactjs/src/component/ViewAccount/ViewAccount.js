// import React from 'react'
// import React from 'react'
import { useState, useEffect } from "react"
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate"
import TopBar from "../LayoutBar/TopBar"
import useLogout from "../../hooks/useLogout.js"
import { useNavigate } from "react-router-dom"

const ViewAccount = () => {
    const axiosPrivate = useAxiosPrivate();
    const [usersData, setUsersData] = useState()
    const logout = useLogout()
    const navigate = useNavigate()

    const capitalized = str => str.charAt(0).toUpperCase() + str.slice(1)

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    const getProfile = async () => {
      try {
        const response = await axiosPrivate.get('/profile/:username', {
          signal: controller.signal
        }
        )
        console.log(response)
        isMounted && setUsersData(response)
      } catch (error) {
        console.log(error)
      }
    }
    getProfile()

    return () => {
      isMounted = false;
      controller.abort()
    }

    },[])
 
    const handleLogout = async() => {
     await logout()
     navigate('/landingpage')
    }

  return (
    
    <article>
      <TopBar />
        <h2>Users List</h2>
        {usersData?.length
        ? ( 
            
                usersData.map( user => {
                  return(
                    <div className="userData" key={user} >
                      Username: {capitalized(user?.username)} <br />
                      Firstname: {user?.firstname}<br />
                      Lastname: {user?.lastname}<br />
                      Email: {user?.email}<br />
                    </div>
                  )
                  
                })
           
            
        ) : <p>No users to display</p>
        }
        <button onClick={handleLogout}>Logout</button>
    </article>
  )
}

export default ViewAccount