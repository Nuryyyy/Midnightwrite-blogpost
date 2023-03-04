import ReactDOM from 'react-dom'
import { useState, useEffect, useContext } from "react"
import { useAxiosPrivate } from "../hooks/useAxiosPrivate"
import TopBar from "../component/navbars/TopBar"
import useLogout from "../hooks/useLogout.js"
import { useNavigate, Link, useLocation } from "react-router-dom"
import { AuthContext } from "../context/AuthProvider"
import useDeleteAccount from "../hooks/useDeleteAccount"
import './style/ViewAccount.css'
import UseUploadImage from '../hooks/useUploadImage.js'
import AboutMe from '../component/modal/AboutMe'
import SeeAllPost from '../component/post/SeeAllPost'
import Message from '../component/modal/Message'
import '../App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera, faCameraRetro, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import {faMessage} from '@fortawesome/free-regular-svg-icons'

// import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro'
function ViewAccount() {
  const axiosPrivate = useAxiosPrivate();
  const [usersData, setUsersData] = useState({})
  const { userID, currentUser } = useContext(AuthContext)
  // const { setPhoto } = useAuth()
  const logout = useLogout()
  const deleteUser = useDeleteAccount()
  const navigate = useNavigate()

  const PF = "http://localhost:8000/upload/"

  const location = useLocation()
  const userName = location.pathname.split("/")[2]
 

  const capitalized = str => str.charAt(0).toUpperCase() + str.slice(1)

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    const getData = async () => {
      try {
        const response = await axiosPrivate.get(`/profile/${userName}`, {
          signal: controller.signal
        }
        )
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
  },[userName])


  //logout for user
  const handleLogout = async() => {
    await logout()
    navigate('/')

   }

   const handleDelete = async () => {
    await deleteUser()
    navigate('/')
   }

   const updateAccount = () => {
    // <Navigate to='/about' />
    navigate(`/profile/${userID}/update`)
   }

  

  return (
    <>
     <header><TopBar /></header>
    <article>
      

      <section className="vh-100 gradient-custom-2">
        <div className="container-fluid py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-md-9 col-lg-7 col-xl-7 ">
              <div className="main card">
                <div className="headerCard rounded-top text-white d-flex flex-row align-items-center p-md-2 p-lg-4 p-xl-4 m" > 
                  <div className='flex-shrink-0 ms-5 mt-3 mb-3 ps-lg-3 ps-md-2' >
                    {usersData.image ? (
                  <img src={PF + usersData.image} alt="profile" className="profile img-fluid img-thumbnail "/>) :
                  ( <img src={PF + "default.jpg"} alt="profile" className="profile img-fluid img-thumbnail "/>)}
                  </div>
                  
                  <div className="detail flex-grow-1 ms-5" >
                    <h3 className="mb-2">{usersData?.firstname} {usersData?.lastname}</h3>
                    <p className="mb-2 pb-1 text-muted">{usersData?.username}</p>
                    <div className="d-flex pt-1">
                    { currentUser === usersData.username ? 
                    <div>
                    <FontAwesomeIcon icon={faCamera} size='lg' className='icon' data-bs-toggle="modal" data-bs-target="#uploadimage"/>
                    <FontAwesomeIcon icon={faPenToSquare} className='icon ms-2' size='lg'onClick={updateAccount}/>
                    </div>
                    :
                    <div>
                    <p className="font-italic">
                    <FontAwesomeIcon className='me-2' icon={faMessage} size='lg' style={{verticalAlign: 'middle'}} data-bs-toggle="modal" data-bs-target="#message"/>
                    {usersData.email}</p>
                    </div>}             
                  </div>
                  </div> 
                  </div>
                   
                {/* modal call */}
                <div className="modal fade" id="uploadimage" tabIndex="-1" aria-labelledby="uploadimage" aria-hidden="true">
                <div><UseUploadImage /> </div>
                <button type="button" className="btn-close" data-dismiss="modal" aria-label="Close"></button>
                </div>

                {/* <button type="button" classNameName="btn btn-primary" data-bs-toggle="modal" data-bs-target="#description">
            EDIT</button> */}


                <div className="modal fade" id="description" tabIndex="-1" aria-labelledby="description" aria-hidden="true">
                <div><AboutMe /> </div>
                <button type="button" className="btn-close" data-dismiss="modal" aria-label="Close"></button>
                </div>


                
                <div className="card-body p-4 text-black">
                  <div className="mb-5">
                    <h3 className="lead fw-normal mb-1">About me</h3>
                    <div className="p-4">
                      
                        { usersData.aboutme ? (
                           <p className="font-italic p3">{usersData?.aboutme}</p>
                        ) :(
                          <div>
                           
                          <a data-bs-target="#description" data-bs-toggle="modal" id="description" className='font-italic mb-1'
                            href="#description">Tell us more about you</a>
                          
                          </div>
              
                          )

                        }
                     
                    </div>
                    
                    {currentUser === usersData.username ? 
                      <div>
                      <button onClick={handleLogout} type="button" className="btn btn-outline-dark" data-mdb-ripple-color="dark">Logout</button>
                      {/* <button onClick={handleDelete} type="button" className="btn btn-outline-dark" data-mdb-ripple-color="dark">Delete Account</button>  */}
                      </div> : <></>  
                    }
                    
                  </div>
           
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <p className="lead fw-normal mb-0">Recent posts</p>
                    <p className="mb-0"><Link to={`/post/allpost/${usersData.username}`} className="link">Show all</Link></p>
                  </div>
                  <SeeAllPost username={usersData.username}/>
                </div>


                <div>
                <div className="text-center">
                <div className="modal fade" data-toggle="modal" data-target="#message" tabIndex="-1" aria-hidden="true" role="dialog" id="message" aria-labelledby="message" >
               

                <Message sendToUser={usersData.email} username={usersData.username}/>
                {/* <button type="button" className="btn-close" data-dismiss="modal" aria-label="Close"></button> */}
                </div>
              </div> </div>
              </div>


            </div>
          </div>
        </div>
      </section>
    </article>
    </>
    
    
  )
}

export default ViewAccount

