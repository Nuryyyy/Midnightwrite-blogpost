import React, {useState, useRef, useEffect} from 'react';
// import axios from '../../api/axios';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate'
import axios from '../../api/axios';
import TopBar from '../LayoutBar/TopBar';
import { Navigate, useNavigate } from 'react-router-dom';
// import useUploadImage from '../../hooks/useUploadImage';

const createpost_url = '/post/create'

export default function CreatePost() { 

  const axiosPrivate = useAxiosPrivate()

  const userRef = useRef()
  const errRef = useRef()

  const navigate = useNavigate()


  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState("")
  const [file, setFile] = useState(null)
  const [errMsg, setErrMsg] = useState("")
  const [success, setSuccess] = useState(false)
  // const  upload = useUploadImage()

  useEffect(() => {
    userRef.current.focus()
  },[])

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
    console.log("imgURL:", imgURL)
    try {
      const response = await axiosPrivate.post(createpost_url,
        JSON.stringify({
          title: title, 
          description: description,
          image: file? imgURL : ""
        }),
        {
            withCredentials: true
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
        {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}
          <form onSubmit={handleSubmit}>
          <label htmlFor="file"> 
            Add image
          </label>
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <br></br>
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
