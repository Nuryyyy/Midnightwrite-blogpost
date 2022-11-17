import React, {useState, useRef, useEffect} from 'react';
// import axios from '../../api/axios';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate'
import TopBar from '../LayoutBar/TopBar';
import { Navigate, useNavigate } from 'react-router-dom';
// import PostSuccess from '../Modal/PostSuccess';

const createpost_url = '/posts/create'

export default function CreatePost() { 

  const axiosPrivate = useAxiosPrivate()

  const userRef = useRef()
  const errRef = useRef()

  const navigate = useNavigate()


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
    console.log("handlesubmit")

    try {
      const response = await axiosPrivate.post(createpost_url,
        JSON.stringify({
          title: title, 
          description: description
        }),
        {
          headers: {
            'Content-Type': "application/json",
            "Access-Control-Allow-Headers":"Authorization",
           
            withCredentials: true
          }  
        })
        console.log("successpost")
        console.log(JSON.stringify(response.data))
        setTitle("")
        setDescription("")
        setSuccess(true)
        //clear input fields
    } catch (error) {
      console.log(error)
      errRef.current.focus();
    } 

  }




  return (
    
    <div>
      <TopBar />
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
 
  )
}
