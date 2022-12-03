//post na e display sa home
import { Link } from 'react-router-dom';
import axios from '../../api/axios'

const Post = ({post}) => {
  const PF = "http://localhost:8000/upload/";
  return (
    <div className="post">
    {post.photo && <img className="postImg" src={PF + post.photo} alt="" />}
    <div className="postInfo">
      {/* <div className="postCats">
        {post.categories.map((c) => (
          <span className="postCat">{c.name}</span>
        ))}
      </div> */}
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