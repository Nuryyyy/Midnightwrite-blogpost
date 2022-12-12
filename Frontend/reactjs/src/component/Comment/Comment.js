import './Comment.css'
import React, {useState, useContext, useEffect, useRef } from 'react';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate'
import { AuthContext } from "../../context/AuthProvider"
import ShowComment from './ShowComment';

function Comment({postid}) {

    const userRef = useRef()
    const errRef = useRef();

    const axiosPrivate = useAxiosPrivate()
    const [comment, setComment] = useState("")
    const [commentFocus, setCommentFocus] = useState("")
    const { currentUser, userID } = useContext(AuthContext)
    const [data, setData] = useState("")
    const [success, setSuccess] = useState(false)
    const PF = "http://localhost:8000/upload/"
    
    useEffect(() => {
        userRef.current.focus()
      }, [])

    useEffect(() => {
        const getData = async () =>{
            try {
                const response = await axiosPrivate.get(`/profile/${currentUser}`)
                setData(response?.data)

            } catch (error) {
                console.log(error)
            }

        }
        getData()
    },[currentUser])


    const handleSubmit = async(e) => {
        e.preventDefault()
        console.log("handlesubmit")
        try {
           const response = await axiosPrivate.post('/comment',
           JSON.stringify({
            post_id : postid,
            body : comment,
            username: currentUser,
            image : data.image
           }),
           {
            withCredentials: true
            }
           )
           console.log(response?.data)
           console.log("postid:",postid)
           setComment("")
           setSuccess(true)
        
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <> {success ? (window.location.reload()):(
    <div className="container">
    <div className="row">
        
    
        <div className="col-md-8">
        <form onSubmit={handleSubmit}>
            <div className="media g-mb-30 media-comment">
                <img className="d-flex g-width-50 g-height-50 rounded-circle g-mt-3 g-mr-15" src={PF + data.image} alt="Ima Description" />
                <div className="media-body u-shadow-v18 g-bg-secondary g-pa-30">

                  <div className="g-mb-15">
                    <h5 className="h5 g-color-gray-dark-v1 mb-0">{currentUser}</h5>
                    {/* <span className="g-color-gray-dark-v4 g-font-size-12">5 days ago</span> */}
                  </div>
                 
                  <div className="form-outline">
                  <label className="form-label" htmlFor='comment'>What is your view?</label>
                  <textarea 
                  className="form-control" 
                  id="comment" 
                  rows="4"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                  placeholder='Add comment' 
                  type='text' 
                  ref={userRef} 
                  onFocus={() => setCommentFocus(true)}
                  onBlur={() => setCommentFocus(false)}/>
                  
                </div>
                <div className="d-flex justify-content-between mt-3">
                  <button type="button" className="btn btn-success">Cancel</button>
                  <button type="button submit" className="btn btn-danger">
                    Send <i className="fas fa-long-arrow-alt-right ms-1"></i>
                  </button>
                </div>
            
                
             
                </div>
            </div>
            </form>    
        </div>
        
    </div>
    <ShowComment postID={postid} />
    </div>
    )}
    </>
  )
}

export default Comment