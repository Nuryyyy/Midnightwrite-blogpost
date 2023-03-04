import React, { useContext, useState, useEffect } from 'react'
import { useRouteLoaderData } from 'react-router-dom'
import { AuthContext } from "../../context/AuthProvider"
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate'
import { useLocation, Link } from 'react-router-dom'
import './Topbar.css'
import '../Post/Posts.css'


const MenuBar = ({setCat, cat}) => {

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
      <span className="sidebarTitle"><h4>Select Category:</h4></span>
      <div className="item">
          <div className="cat">
            <input
              type="radio"
              checked={cat === "art"}
              name="cat"
              value="art"
              id="art"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="art">Art</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "science"}
              name="cat"
              value="science"
              id="science"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="science">Science</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "technology"}
              name="cat"
              value="technology"
              id="technology"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="technology">Technology</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "music"}
              name="cat"
              value="music"
              id="music"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="music">Music</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "cinema"}
              name="cat"
              value="cinema"
              id="cinema"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="cinema">Cinema</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "lifestyle"}
              name="cat"
              value="lifestyle"
              id="lifestyle"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="lifestyle">Lifestyle</label>
          </div>
          </div>
          {/* <button>hello</button> */}
    </div>

    </div>
    
    
  )
}

export default MenuBar