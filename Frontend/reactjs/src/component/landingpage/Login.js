import React, {useState, useRef, useEffect, useContext} from 'react';
import { AuthContext } from '../../context/AuthProvider';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import CreatePost from '../Post/CreatePost';
import { Link } from 'react-router-dom';


  const login_url = '/login' 
  
  export default function Login() {
  const {setAuth} = useContext(AuthContext)
  const userRef = useRef()
  const errRef = useRef()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errMsg, setErrMsg] = useState("")
  const [success, setSuccess] = useState(false)

  const navigate = useNavigate

  useEffect(() => {
    userRef.current.focus()
  },[])

  useEffect(() => {
    setErrMsg('')
  }, [username, password])


  const handleSubmit = async(e) => {
    e.preventDefault()
    

    console.log("handlesumbit")
    
 
    // setUsername('')
    // setPassword()

    try {
      const response = await axios.post(login_url,
        JSON.stringify({
          username: username, 
          password: password
        }),
        {
          headers: {
            'Content-Type': "application/json",
            // "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            // "Access-Control-Allow-Headers":"Authorization",
            withCredentials: true
          }  
        })
        console.log("in function response")
        console.log(JSON.stringify(response.data))
        const Token = response.data.token
        setAuth({username, password, Token})
        setUsername('')
        setPassword('')

        setSuccess(true)
        //clear input fields
    } catch (error) {
      console.log(error)
      errRef.current.focus();
    } 

  }

  
  return (
    
    <>
    {success ? (
      <div>
        <h1> success login!</h1>
       
        {/* <p>
          <a href="/posts/create">Log In</a>
        </p> */}
       {/* <nav>
        <Link to="/posts/create" />
       </nav> */}

      </div>
    ) : (
    <div>
     <section>
     <p ref={(errRef)}  className={errMsg ? "errmsg": "offscreen"}>{errMsg}</p>
     <h1>Sign in</h1>
       <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
          <input type="text" 
          id="username"  
          ref={userRef}
          autoComplete="off"
          onChange = {(e) => setUsername(e.target.value)}
          value={username}
          required
          />

        <label htmlFor="password">Password:</label>
        <input type="password" 
          id="password" 
          autoComplete="off"
          onChange = {(e) => setPassword(e.target.value)}
          value={password}
          required
          />

        <button type="submit" id="btnOption" className="click-btn">Sign In</button>
        </form>
            <a href="">Forgot password?</a>
    </section>
    </div>
    )} 
    </>
  )
}
