import './Comment.css'
import React, {useState, useContext, useEffect, useRef } from 'react';
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate'
import { AuthContext } from "../../context/AuthProvider"
import moment from "moment"

function ShowComment({postID}) {

    const axiosPrivate = useAxiosPrivate()
    const [comments, setComments] = useState("")
    // const [image, setImage] = useState("")
    // const[username, setUsername] = useState("")
    // const[success, setSuccess ] = useState(false)

    const PF = "http://localhost:8000/upload/";


    useEffect(() => {
        const getComment = async () =>{
            try {
                const response = await axiosPrivate.get(`/comment/${postID}`)
                setComments(response.data)
                console.log("comment:", response.data)
                // setSuccess(true)


            } catch (error) {
                console.log(error)
            }

        }
        getComment()
    },[postID])


  return (
    
    <div className="container">
<div className="row">
        {comments && comments
        .sort((a,b) => a.comment_date < b.comment_date ? 1 : -1)
        .map((comment, post_id) => (
            <div className="col-md-8" key={post_id}>
        <div className="media g-mb-30 media-comment">
            <img className="d-flex g-width-50 g-height-50 rounded-circle g-mt-3 g-mr-15" src={PF + comment.image} alt="profile" />
            <div className="media-body u-shadow-v18 g-bg-secondary g-pa-30">
              <div className="g-mb-15">
                <h5 className="h5 g-color-gray-dark-v1 mb-0">{comment.username}</h5>
                <span className="g-color-gray-dark-v4 g-font-size-12">{moment(comment.comment_date).fromNow()}</span>
              </div>
              <p>{comment.body}</p>
            </div>
        </div>
    </div>
        )
        )
        }
</div>
</div>

  )
}

export default ShowComment