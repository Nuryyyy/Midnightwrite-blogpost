
import { useState, useEffect, useContext } from "react"
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate"
import TopBar from "../LayoutBar/TopBar"
import useLogout from "../../hooks/useLogout.js"
import { useNavigate, Link, useLocation } from "react-router-dom"
import './ViewAccount.css'
import { AuthContext } from "../../context/AuthProvider"
import useDeleteAccount from "../../hooks/useDeleteAccount"
import axios from "../../api/axios"

function ViewAccount() {
  const axiosPrivate = useAxiosPrivate();
  const [usersData, setUsersData] = useState({})
  const [file, setFile] = useState(null) //({})
  const { userID } = useContext(AuthContext)
  const logout = useLogout()
  const deleteUser = useDeleteAccount()
  const navigate = useNavigate()

 
  const location = useLocation()
  const userName = location.pathname.split("/")[2]
  console.log("username:", userName)
 
  // console.log("userID:",userID)

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

  const upload= async () => {
    try {
      const formData = new FormData();
      formData.append("image", file);
      const res = await axios.post("/upload", formData, {
        "Content-Type": "multipart/form-data"
      })
      console.log(res.data)
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

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


   const uploadPhoto = async (e) => {
    e.preventDefault()
    const imgUrl = await upload()
    try {
      const response = await axiosPrivate.put("/profile/upload" , 
      JSON.stringify({
        image : file ? imgUrl : "" }), {
          withCredentials: true})
    } catch (error) {
      console.log(error)
    }
   }

  return (
    
    <article>
      <TopBar />

        <section>
        <div class="container-fluid py-5 h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col col-lg-9 col-xl-7">
              <div class="card">
                <div class="rounded-top text-white d-flex flex-row" >
                  <div class="ms-4 mt-5 d-flex flex-column" >
                    <img className="profile" src="https://i.pinimg.com/236x/a9/76/8a/a9768ac11bc85dc66f90eb6f1ad968e6.jpg" 
                      alt="Yor Forger" class="img-fluid img-thumbnail mt-4 mb-2"/>
                        <button onClick={updateAccount} type="button" class="btn btn-outline-dark" data-mdb-ripple-color="dark">Update Account</button>
                        
                  </div>
                
                  <div class="ms-3" >
                    <h5>{usersData?.username}</h5>
                  </div>
                </div>
                <div class="p-4 text-black" s>
                </div>
                <div class="card-body p-4 text-black">
                  <div class="mb-5">
                    <p class="lead fw-normal mb-1">About</p>
                    <div class="p-4">
                      <p class="font-italic mb-1">Firstname: {usersData?.firstname}</p>
                      <p class="font-italic mb-1">Lastname: {usersData?.lastname}</p>
                      <p class="font-italic mb-0">Email: {usersData?.email}</p>
                    </div>
                    <button onClick={handleLogout} type="button" class="btn btn-outline-dark" data-mdb-ripple-color="dark">Logout</button>
                    <button onClick={handleDelete} type="button" class="btn btn-outline-dark" data-mdb-ripple-color="dark">Delete Account</button>
                  </div>
                  <div>
                  <input
                  style={{ display: "none" }}
                  type="file"
                  id="file"
                  // name=""
                  onChange={(e) => setFile(e.target.files[0])}
                 />
                    <label className="file" htmlFor="file">
                      Upload Image
                    </label>
                  <button className="file" htmlFor="file" onClick={uploadPhoto} type="button" class="btn btn-outline-dark" data-mdb-ripple-color="dark">Add photo</button>
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
    </article>
  )
}

export default ViewAccount