import React, {useState, useRef, useEffect, useContext} from 'react';
import { AuthContext } from '../../context/AuthProvider';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate'
import TopBar from '../LayoutBar/TopBar';
import { Navigate, useNavigate } from 'react-router-dom';

const createpost_url = '/posts/create'
export default function CreatePost() { 
  const axiosPrivate = useAxiosPrivate()
  // const {setAuth} = useContext(AuthContext)
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
    // setUsername('')
    // setPassword()

    try {
      const response = await axiosPrivate.post(createpost_url,
        JSON.stringify({
          title: title, 
          description: description
        }),
        {
          headers: {
            'Content-Type': "application/json",
            // "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            "Access-Control-Allow-Headers":"Authorization",
           
            withCredentials: true
          }  
        })
        console.log("in function response")
        // console.log(JSON.stringify(response.data))
        // const Token = response.data.token
        // console.log(Token)
        // setAuth({title, description, Token})
        setTitle("")
        setDescription("")
        setSuccess(true)
        navigate('/profile')
        //clear input fields
    } catch (error) {
      console.log(error)
      errRef.current.focus();
    } 

  }




  return (
    
    <>
     {/* {success ? (
      <div>
      <h1>Success!</h1>

    <div class="modal fade" id="ignismyModal" role="dialog" tabindex="-1" aria-labelledby="Register" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label=""><span>×</span></button>
                 </div>
      
                <div class="modal-body">
                   
        <div class="thank-you-pop">
          <h1>Thank You!</h1>
          <p>Your submission is received and we will contact you soon</p>
          <h3 class="cupon-pop">Your Id: <span>12345</span></h3>
          
         </div>
                     
                </div>
      
            </div>
        </div>
    </div>
    </div>

    ) : ( */}
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
    {/* )} */}
   </>
  )
}
