import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from "../../context/AuthProvider"
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate'
import { useLocation, Link } from 'react-router-dom'
import './Topbar.css'


const Sidebar = () => {

    const PF = "http://localhost:8000/upload/"
    const { userID, currentUser } = useContext(AuthContext)
    const axiosPrivate = useAxiosPrivate()
    const [userData, setUserData] = useState("")

    const location = useLocation()
    const userName = location.pathname.split("/")[2]


    useEffect(() => {
        try {
            const getData =  async () => {
                const response = await axiosPrivate.get(`/profile/${currentUser}`,
                {withCredentials: true })
                setUserData(response?.data)
            }
            getData()
        } catch (error) {
            console.log(error)
        }
       
       
    },[userName])

  return (
    
    
    <div className="sidebar">
      <div className="sidebarItem">
      <span className="sidebarTitle">ABOUT ME</span>
      
        <img src={PF + userData.image} alt="profile" className="img-fluid mb-3" />
        <div>
          <Link to={`/profile/${userData.username}`}>
          <h3>{userData.username}</h3>
          </Link>
        </div>
        {/* <h3 onClick={`/profile/${userData.username}`}>{userData.username}</h3> */}
        {userData.aboutme ? (
            <p>{userData.aboutme.substring(0,100)+'...'}
            <a href={`/profile/${userData.username}`}>read more</a>
            </p>
        ):(
            <a href={`/profile/${currentUser}`}>Add bio</a>
        )}
        
    </div>
    <div className="sidebarItem">
    <span className="sidebarTitle">CATEGORIES</span>
      <ul className="sidebarList">
        <li className="sidebarListItem">
          <Link className="link" to="/post/allpost?category=life">
            Life
          </Link>
        </li>
        <li className="sidebarListItem">
          <Link className="link" to="/post/allpost?category=music">
            Music
          </Link>
        </li>
        <li className="sidebarListItem">
          <Link className="link" to="/post/allpost?category=science">
            Science
          </Link>
        </li>
        <li className="sidebarListItem">
          <Link className="link" to="/post/allpost?category=art">
            Art
          </Link>
        </li>
        <li className="sidebarListItem">
          <Link className="link" to="/post/allpost?category=technology">
            Tech
          </Link>
        </li>
        <li className="sidebarListItem">
          <Link className="link" to="/post/allpost?category=cinema">
            Cinema
          </Link>
        </li>
      </ul>
    </div>
    </div>
    
    
  )
}

export default Sidebar