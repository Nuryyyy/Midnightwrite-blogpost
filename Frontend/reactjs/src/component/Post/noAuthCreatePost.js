import React, {useState, useRef, useEffect} from 'react';
// import { AuthContext } from '../../context/AuthProvider';
import axios from '../../api/axios';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate'
import TopBar from '../LayoutBar/TopBar';

const createpost_url = '/posts/new'

export default function NewPost() { 
  // const axiosPrivate = useAxiosPrivate()
  // const {setAuth} = useContext(AuthContext)
  const userRef = useRef()
  const errRef = useRef()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [username, setUsername] = useState("")
  const [userID, setUserID] = useState("")
  // const [image, setImage] = useState("") instead use e.target.files because it's image
  const [errMsg, setErrMsg] = useState("")
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    userRef.current.focus()
  },[])

  useEffect(() => {
    setErrMsg('')
  }, [username, userID, title, description])

  const handleSubmit = async(e) => {
    e.preventDefault()
    console.log("handlesubmitPost")
    try {
      const response = await axios.post(createpost_url,
        JSON.stringify({
            username: username,
            user_id: userID,
            title: title, 
            description: description
          
          

        }),
        {
          headers: {
            'Content-Type': "application/json",
            withCredentials: true
          },
          
        }
        )
        console.log("in createpost response")
        console.log(JSON.stringify(response?.data))
        setDescription("")
        setSuccess(true)
        //clear input fields
    }  catch (err) {
      console.log(err)
      errRef.current.focus();
  }

  }

  return (
    
    <>
     {success ? (
      <div>
        <h1>Posted!</h1>
        {/* <<p>
          <a href="#">Log In</a>
        </p>> */}
        
      </div>
    ) : (
    <div>
      <TopBar />
      <section>

        <p ref={(errRef)}  className={errMsg ? "errmsg": "offscreen"}>{errMsg}</p>
        <h1>Create your post</h1>
        <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
            <input 
            required 
            type='text' 
            id='username' 
            value={username} 
            onChange = {(e) => setUsername(e.target.value)}
            ref={userRef}
            />

             <label htmlFor="userID">userID</label>
            <input 
            required 
            type='text' 
            id='userID' 
            value={userID} 
            onChange = {(e) => setUserID(e.target.value)}
            ref={userRef}
            />

            <label htmlFor="title">Title</label>
            <input 
            required 
            type='text' 
            id='title' 
            value={title} 
            onChange = {(e) => setTitle(e.target.value)}
            ref={userRef}
            />
            
            <label htmlFor="description">Description:</label>
            <textarea 
            required
            id="description" 
            value={description} 
            onChange = {(e) => setDescription(e.target.value)}
            ref={userRef}
            />

            {/* <label for='markdown'>markdown</label>
            <textarea name='markdown' nameClass='markdown'></textarea> */}
            <a href='/' className='btnOption btn-secondary'>Cancel</a>
            <button type="submit">Publish</button>

        </form>
        

      </section>
    </div>
    )}
   </>
  )
}
