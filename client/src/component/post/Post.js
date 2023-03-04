//post na e display sa home
import { Link } from 'react-router-dom';
import axios from '../../api/axios'

const Post = ({post}) => {
  
  const PF = "http://localhost:8000/upload/";

  //to elminate problem with displaying 
  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }
  return (
   
    <article>
    {post.image && <img className="img-fluid pb-3" src={PF + post.image} alt="" />}
    <h3>{post.title}</h3>
    <p className="text-secondary">{new Date(post.datepost).toDateString()}</p>
    <p>{getText(post.description.substring(0, 200)+'....')}
    <a href={`/post/${post.post_id}`}>read more</a>
    </p>

    {/* <div className="postInfo">
      <div className='text w-75 h-50 p-4'>
      <Link to={`/post/${post.post_id}`} className="link">
        <span className="postTitle">{post.title}</span>
      </Link>
      <hr />
      <span className="postDate">
        {new Date(post.datepost).toDateString()}
      </span>
    </div>
    <p className="postDesc">{post.description.substring(0, 200)+'....'}
    <a href={`/post/${post.post_id}`}>read more</a></p>
    </div> */}

</article>
  
 
  )
}

export default Post