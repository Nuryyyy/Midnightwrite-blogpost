import { useState, useEffect } from "react"
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate"
import TopBar from "../LayoutBar/TopBar"
import useLogout from "../../hooks/useLogout.js"
import { useNavigate } from "react-router-dom"
import './ViewAccount.css'

const ViewAccount = () => {
    const axiosPrivate = useAxiosPrivate();
    const [usersData, setUsersData] = useState()
    const logout = useLogout()
    const navigate = useNavigate()

    const capitalized = str => str.charAt(0).toUpperCase() + str.slice(1)

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    const getData = async () => {
      try {
        const response = await axiosPrivate.get('/profile', {
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

    },[])
 
    const handleLogout = async() => {
     await logout()
     navigate('/landingpage')
    }

  return (
    //setshow is false for now 
    <article>
      <TopBar />
        {usersData?.length
        ? ( 
            
                usersData.map( user => {
                  return(
                    <section>
                    <div class="container-fluid py-5 h-100">
                      <div class="row d-flex justify-content-center align-items-center h-100">
                        <div class="col col-lg-9 col-xl-7">
                          <div class="card">
                            <div class="rounded-top text-white d-flex flex-row" >
                              <div class="ms-4 mt-5 d-flex flex-column" >
                                <img className="profile" src="https://i.pinimg.com/236x/a9/76/8a/a9768ac11bc85dc66f90eb6f1ad968e6.jpg" 
                                  alt="Yor Forger" class="img-fluid img-thumbnail mt-4 mb-2"/>
                                    <button onClick={handleLogout} type="button" class="btn btn-outline-dark" data-mdb-ripple-color="dark">Logout</button>

                              </div>
                              <div class="ms-3" >
                                <h5>{user?.username}</h5>
                              </div>
                            </div>
                            <div class="p-4 text-black" s>
                            </div>
                            <div class="card-body p-4 text-black">
                              <div class="mb-5">
                                <p class="lead fw-normal mb-1">About</p>
                                <div class="p-4">
                                  <p class="font-italic mb-1">Firstname: {user?.firstname}</p>
                                  <p class="font-italic mb-1">Lastname: {user?.lastname}</p>
                                  <p class="font-italic mb-0">Email: {user?.email}</p>
                                </div>
                              </div>
                              <div class="d-flex justify-content-between align-items-center mb-4">
                                <p class="lead fw-normal mb-0">Recent posts</p>
                                <p class="mb-0"><a href="#!" class="text-muted">Show all</a></p>
                              </div>
                              <div class="row g-2">
                                <div class="col mb-2">
                                  <img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp" alt="1" class="w-100 rounded-3"/>
                                </div>
                                <div class="col mb-2">
                                  <img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(107).webp" alt="2" class="w-100 rounded-3" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                  )
                  
                })
           
            
        ) : <p>No users to display</p>
        }
    </article>
  )
}

export default ViewAccount