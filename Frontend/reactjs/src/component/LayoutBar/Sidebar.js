import React, { useContext, useState, useEffect } from 'react'
import { useRouteLoaderData } from 'react-router-dom'
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
    <span className="sidebarTitle"><h4>CATEGORIES</h4></span>
      <ul className="sidebarList">
        <li className="sidebarListItem">
          <Link className="link" to="/posts?cat=Life">
            Life
          </Link>
        </li>
        <li className="sidebarListItem">
          <Link className="link" to="/posts?cat=Music">
            Music
          </Link>
        </li>
        <li className="sidebarListItem">
          <Link className="link" to="/posts?cat=Sport">
            Sport
          </Link>
        </li>
        <li className="sidebarListItem">
          <Link className="link" to="/posts?cat=Style">
            Style
          </Link>
        </li>
        <li className="sidebarListItem">
          <Link className="link" to="/posts?cat=Tech">
            Tech
          </Link>
        </li>
        <li className="sidebarListItem">
          <Link className="link" to="/posts?cat=Cinema">
            Cinema
          </Link>
        </li>
      </ul>
    </div>
    </div>
    
    
  )
}

export default Sidebar