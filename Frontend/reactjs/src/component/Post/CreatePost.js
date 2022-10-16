import React, {useState, useRef, useEffect, useContext} from 'react';
import { AuthContext } from '../../context/AuthProvider';
import axios from '../../api/axios';

const createpost_url = '/posts/create'
export default function CreatePost() { 

  const {setAuth} = useContext(AuthContext)
  const userRef = useRef()
  const errRef = useRef()


  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [errMsg, setErrMsg] = useState("")
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    userRef.current.focus()
  },[])

  useEffect(() => {
    setErrMsg('')
  }, [title, description])

  const handleSubmit = async(e) => {
    e.preventDefault()
    console.log("sumbitiri")
    // setUsername('')
    // setPassword()

    try {
      const response = await axios.post(createpost_url,
        JSON.stringify({
          title: title, 
          description: description
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
        setAuth({title, description, Token})
        setTitle('')
        setDescription('')
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
        <h1>Posted!</h1>
        {/* <<p>
          <a href="#">Log In</a>
        </p>> */}
        
      </div>
    ) : (
    <div>
      <section>
        <p ref={(errRef)}  className={errMsg ? "errmsg": "offscreen"}>{errMsg}</p>
        <h1>Create your post</h1>
        <form onSubmit={handleSubmit}>
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
            <button type="submit">Submit</button>

        </form>
        

      </section>
    </div>
    )}
   </>
  )
}
