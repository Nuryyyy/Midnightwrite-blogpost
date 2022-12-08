//post na e display sa home
import { Link } from 'react-router-dom';
import axios from '../../api/axios'

const Post = ({post}) => {
  const PF = "http://localhost:8000/upload/";
  return (
    <div className="post">
    {post.image && <img className="postImg" src={PF + post.image} alt="" />}
    <div className="postInfo">
      <Link to={`/post/${post.post_id}`} className="link">
        <span className="postTitle">{post.title}</span>
      </Link>
      <hr />
      <span className="postDate">
        {new Date(post.datepost).toDateString()}
      </span>
    </div>
    <p className="postDesc">{post.description}</p>
  </div>
  )
}

export default Post