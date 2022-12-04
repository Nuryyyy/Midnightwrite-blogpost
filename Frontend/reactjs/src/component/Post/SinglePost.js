import { useAxiosPrivate } from "../../hooks/useAxiosPrivate"
import { Link, useLocation } from "react-router-dom"
import { AuthContext } from "../../context/AuthProvider"
import { useState, useContext, useEffect } from "react"
import TopBar from "../LayoutBar/TopBar"
import './Posts.css'


function SinglePost() {
  const axiosPrivate = useAxiosPrivate()
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const { currentUser, userID } = useContext(AuthContext)
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("")
  const [updateMode, setUpdateMode] = useState(false);
  const PF = "http://localhost:8000/upload/";
  const [ username, setUsername ] = useState("")
  const [ userid, setUserid ] = useState("")
 
  useEffect(() => {
    const getPost = async () => {
      const res = await axiosPrivate.get("/post/" + path);
      console.log("path:", path)
      setPost(res.data[0]);
      setTitle(res.data[0].title);
      setDescription(res.data[0].description);

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
        // username: post.username,
        title,
        description,
        // datepost: new Date.now()
      });
      setUpdateMode(false)
    } catch (err) {}
  };

  return (
    
    <>
    
    <TopBar />
    
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
            {post.username === currentUser && (
              
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
              <b> {post.username}</b>
            </Link>
          </span>
          <span className="singlePostDate" >
            {new Date(post.datepost).toDateString()}
          </span>
        </div>
        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        ) : (
          <p className="singlePostDesc">{post.description}</p>
        )}
        {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
    </div>
    </>
    
  );
}

export default SinglePost