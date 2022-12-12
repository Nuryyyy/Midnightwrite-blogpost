import React, {useState, useRef, useEffect } from 'react';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate'
import axios from '../../api/axios';
import TopBar from '../LayoutBar/TopBar';
import { Navigate, useNavigate, useHistory } from 'react-router-dom';
import './Posts.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus, faCameraRetro, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import {faCircle} from '@fortawesome/free-regular-svg-icons'


import "react-quill/dist/quill.snow.css";
import moment from "moment";

const createpost_url = '/post/create'

export default function CreatePost() { 

  const axiosPrivate = useAxiosPrivate()

  const userRef = useRef()
  const errRef = useRef()

  const navigate = useNavigate()
  


  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState("")
  const [postID, setPostID] = useState("")
  const [file, setFile] = useState(null)
  const [errMsg, setErrMsg] = useState("")
  const [success, setSuccess] = useState(false)
  // const  upload = useUploadImage()

  // useEffect(() => {
  //   userRef.current.focus()
  // },[])

  useEffect(() => {
    setErrMsg('')
  }, [title, description])

  
  const upload= async () => {
    try {
      const formData = new FormData();
      formData.append("image", file);
      const res = await axios.post("/upload", formData)
      console.log("resdata:", res.data)
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };


  const handleSubmit = async(e) => {
    e.preventDefault()
    console.log("handlesubmit")
    const imgURL = await upload()
    try {
      const response = await axiosPrivate.post(createpost_url,
        JSON.stringify({
          title: title, 
          description: description,
          image: file? imgURL : "",
        }),
        {
            withCredentials: true
        })
        // console.log(JSON.stringify(response.data))
        setPostID(response.data.post_id)
        // console.log("postid:", response.data.post_id)
        setTitle("")
        setDescription("")
        setImage(null)
        setSuccess(true)
        // window.location.replace("/post/" + response.data[0].post_id);
    } catch (error) {
      console.log(error)
      // errRef.current.focus();
    } 

  }


  
  return (
    <>
    <header><TopBar /></header>
    { success ? ( 
      <Navigate to={`/post/${postID}`} />

    ):(
   
    
    <section>
    
      
      <p ref={(errRef)}  className={errMsg ? "errmsg": "offscreen"}>{errMsg}</p>
        <div className='write'>
        {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />)}
          <form onSubmit={handleSubmit} className="writeForm">
          <div className="writeFormGroup">
          <label htmlFor="fileInput"> 
          <FontAwesomeIcon icon={faCirclePlus} size='lg' className='writeIcon' />
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          {/* <label htmlFor="title"/> */}
            <input 
            className="writeInput"
            placeholder='Title'
            type='text' 
            // id='title' 
            value={title} 
            onChange = {(e) => setTitle(e.target.value)}
            ref={userRef}
            autoFocus={true}
            />
         </div>
            
         <div className="writeFormGroup">
            {/* <label htmlFor="description" /> */}
            <textarea 
            className="writeInput writeText"
            placeholder='Tell your story...'
            type="text"
            autoFocus={true}
            id="description" 
            value={description} 
            onChange = {(e) => setDescription(e.target.value)}
            ref={userRef}
            />
          </div>
         
            {/* <a href={}' className='btnOption btn-secondary'>Cancel</a> */}
            <button type="submit" className="writeSubmit btn btn-outline-dark">Publish</button>

        </form>
        
      </div>
      </section>
    
        
    )}
   </>
 
  )
}
