// import React, { useInsertionEffect } from 'react';
import React from 'react';
import {useState, useEffect, useRef, useContext } from 'react';
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate"
import { useNavigate, Link, useLocation, Navigate } from "react-router-dom"
import TopBar from "../LayoutBar/TopBar"
import { AuthContext } from '../../context/AuthProvider';



//Requirements or validation for creating usernmame and pasword
// const user_REGEX = /^[A-z][A-z0-9-_]{3,23}$/; //4-24char
// const password_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export default function UpdateAccount() {

  const navigate = useNavigate()
  const axiosPrivate = useAxiosPrivate();
  const { currentUser } = useContext(AuthContext)
  const location = useLocation()
  const [file, setFile] = useState(null);
  const userID = location.pathname.split("/")[2]
  // console.log("userID:", userID)

    //user input, error reference
  const userRef = useRef()
  const errRef = useRef();
    
  const [firstname, setfirstname] = useState("")
  const [fnFocus, setFnFocus] = useState(false)

  const [lastname, setlastname] = useState("")
  const [lnFocus, setLnFocus] = useState(false)

  const [username, setUsername] = useState("")
  const [userFocus, setUserFocus] = useState(false)

  const [email, setEmail] = useState("")
  const [emailFocus, setEmailFocus] = useState(false)

  const [password, setPassword] = useState("")
  const [pwFocus, setPwFocus] = useState(false)
 
  const [image, setImage] = useState("")

  //possible error and if success register
  const [errMsg, setErrMsg] = useState("")
  const [success, setSuccess] = useState(false)

  //option 2 for err
  // const [err, setErr] =  useState(null)

  //capitalize user's input for firstname, lastname and username
  const capitalized = str => str.charAt(0).toUpperCase() + str.slice(1)

  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => {
    setErrMsg('');
}, [firstname, lastname, username, email, password, image])


const upload = async () => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const res = await axiosPrivate.post("/upload", formData);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

  // const handleSubmit = async(e) => {
  //   e.preventDefault()
  //   console.log("handlesumbit")

  const handleSubmit = async(e) => {
    e.preventDefault()
    console.log("handlesumbit")
    const imgUrl = await upload()
    try {
      const response = await axiosPrivate.put(`/profile/${userID}/update`,
        JSON.stringify({
          firstname: firstname, 
          lastname: lastname, 
          username: username, 
          email: email,
          password: password,
          // image: file ? imgUrl : ""
        }),
        {
          headers: {
            'Content-Type': "application/json"
          },
            withCredentials: true
        })
        console.log(JSON.stringify(response?.data))
        console.log("Updated!")
        setSuccess(true)

        //clear input fields
    } catch (error) {
      console.log(error)
      errRef.current.focus();
      setErrMsg(error.response.data)
    } 


  }

  const handleCancel = () => {
    // <Navigate to='/about' />
    navigate(`/profile/${currentUser}`)
   }
 


  return (
    <>
    { success ? (
     <Navigate to={`/profile/${currentUser}`} />
     
    ) 
    : (
    <article>
      <TopBar />
    <section >
        <p ref={(errRef)}  className={errMsg ? "errmsg": "offscreen"}>{errMsg}</p>
      
      <div className="modal-dialog" role="document" >
        <div className="modal-content">
          <div className="modal-header text-center">

        <figure class="figure center">
          {/* <img id="logoViolet" src={logo} alt="logo" class='rounded mx-auto d-block'></img> */}
          <figcaption class="figure-caption ">
          <h5 class="modal-title"  id="modal-title">Update Account</h5>
        </figcaption>
        </figure>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body mx-3">
      <form onSubmit={handleSubmit} className='createaccount'>
      <div class="md-form form-floating mb-3 ">
      {/* <i class="fas fa-user prefix grey-text"></i> */}
          <input 
          // className='form-control validate'
          placeholder='Firstname'
          className='form-control validate'
          type='text' 
          id="firstname" 
          ref={userRef} 
          autoComplete="off" 
          value={capitalized(firstname)}
          onChange={(e)=>setfirstname(e.target.value)} 
          required 
          onFocus={() => setFnFocus(true)}
          onBlur={() => setFnFocus(false)}
          />
          <label htmlFor="firstname" data-error="wrong" data-success="right" >First Name:</label>
        </div>
        
        <div class="md-form form-floating mb-3">
        {/* <i class="fas fa-user prefix grey-text"></i> */}
       
          <input 
          className='form-control validate'
          placeholder='Lastname:'
          type='text' 
          id="lastname" 
          ref={userRef} 
          autoComplete="off" 
          value={capitalized(lastname)}  
          onChange={(e)=>setlastname(e.target.value)}
          required 
          onFocus={() => setLnFocus(true)}
          onBlur={() => setLnFocus(false)}
          />
           <label htmlFor="lastname" data-error="wrong" data-success="right">Last Name:</label>
          </div>

        <div class="md-form form-floating mb-3">
          {/* <i class="fas fa-user prefix grey-text"></i> */}
          <input 
          className='form-control validate' 
          placeholder='Username:'
          type='text' 
          id="username" 
          ref={userRef} 
          autoComplete="off" 
          value={capitalized(username)}  
          onChange={(e)=>setUsername(e.target.value)} 
          onFocus={() => setUserFocus(true)}
          onBlur={() => setUserFocus(false)}
          />
          <label htmlFor="username" data-error="wrong" data-success="right">Username:</label>
          </div>

          <div class="md-form form-floating mb-3">
          {/* <i class="fas fa-envelope prefix grey-text"></i> */}
         
          <input 
          className='form-control validate'
          placeholder='Email:'
          type="email"
          id="email" 
          ref={userRef} 
          autoComplete="off"  
          value={email} 
          onChange={(e)=>setEmail(e.target.value)} 
          onFocus={() => setEmailFocus(true)}
          onBlur={() => setEmailFocus(false)}
          />
           <label htmlFor="email" data-error="wrong" data-success="right">Email:</label>
          </div>

          <div class="md-form form-floating mb-3">
          {/* <i class="fas fa-lock prefix grey-text"></i> */}
         
          <input 
          className='form-control validate'
          placeholder='Password'
          type="password" 
          id="password" 
          value={password} 
          onChange={(e)=>setPassword(e.target.value)} 
          onFocus={() => setPwFocus(true)}
          onBlur={() => setPwFocus(false)}
          /> 
           <label htmlFor="password" data-error="wrong" data-success="right">Password:</label>
          </div>
          <div class="modal-footer d-flex justify-content-end"></div>
          <button type="submit" id="btnOption" className="btn btn-primary">Update</button>
          <button onClick={handleCancel} type="button" class="btn btn-outline-dark" data-mdb-ripple-color="dark">Cancel</button>
          {errMsg && <p>{errMsg}</p>}
        </form>
        </div>
        </div>
        </div>
    </section>
    
    </article>
    )}
    </>

  )
}
