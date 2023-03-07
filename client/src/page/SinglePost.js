import { useAxiosPrivate } from "../hooks/useAxiosPrivate"
import { Link, useLocation } from "react-router-dom"
import { AuthContext } from "../context/AuthProvider"
import { useState, useContext, useEffect } from "react"
import TopBar from "../component/navbars/TopBar"
import '../component/post/Posts.css'
import moment from "moment"
import Sidebar from "../component/navbars/Sidebar"
import Comment from "../component/comment/Comment"


function SinglePost() {
  const axiosPrivate = useAxiosPrivate()
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const { currentUser, userID } = useContext(AuthContext)
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const PF = "http://localhost:8000/upload/";
  const [ usersData, setUsersData ] = useState("")
  const [ userid, setUserid ] = useState("")
  
  useEffect(() => {
    const getPost = async () => {
      const res = await axiosPrivate.get("/post/" + path);
      setPost(res.data[0]);
      setTitle(res.data[0].title);
      setDescription(res.data[0].description);
      setUserid(res.data[0].user_id)

    };
    
    getPost();
  }, [path]);


  const handleDelete = async () => {
    try {
      await axiosPrivate.delete(`/post/${post.post_id}`, {
        data: { user_id: userID },
      });
      window.location.replace("/home");
    } catch (err) {}
  };

  const handleUpdate = async () => {
    try {
      await axiosPrivate.put(`/post/${post.post_id}/edit`, {
        title,
        description,
        // datepost: new Date.now()
      });
      setUpdateMode(false)
      window.location.reload()
    } catch (err) {}
  };


  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }
  return (
    
    <>
    
    <header><TopBar /></header>
    <section className='blog container my-5'>
    <div className="row">
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.image && (
          <img src={PF + post.image} alt="" className="singlePostImg" />
        )}
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singlePostTitle">
            {post.title}
            {post.user_id === userID && (
              
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon far fa-edit"
                  onClick={() => setUpdateMode(true)}
                >edit</i>
                <i
                  className="singlePostIcon far fa-trash-alt"
                  onClick={handleDelete}
                >delete</i>
              </div>
            )}
          </h1>
        )}
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author:
            <Link to={`/profile/${post.username}`} className="link">
              <b> {post.user_id === userID ? (currentUser) : (post.username)}</b>
            </Link>
            <p className="text-muted">Category: 
            <Link to={`/post/allpost?category=${post.category}`} className="link">
              <b className="text-muted"> {post.category}</b>
            </Link></p>
            
          </span>
          <span className="singlePostDate" >
            {/* <p>{new Date(post.datepost).fromNow()}</p> */}
            {post.datepost ? (<p>Posted {moment(post.datepost).fromNow()}</p>) : ("") }
          </span>
        </div>
        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        ) : (
          <p className="singlePostDesc">{getText(post.description)}</p>
        )}
        {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Update
          </button>
        )}
        
      </div>
     </div>
     <div className='sidebar col-lg-4 col-md-4 col-12 col-xl-4 col-xxl-4'>
      <Sidebar />
      </div>
    </div>
    <Comment postid={post.post_id}/>
    </section>

    </>
    
  );
}

export default SinglePost