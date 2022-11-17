import { Router } from "express";
import { verifyJWT } from "../middleware/verifyJWT.js";
import { trialPost,createPost, getAllPost, getPost, editPost, deletePost } from "../controller/posts.js";
const postRouter = Router()

let router = postRouter

//trial
router.get('/', (req, res) => {
    res.json(
	    { info:  'Hello welcome to midnightwrite router' }
    )
    console.log("/posts is working")
})

//get
router.get('/test', verifyJWT, (trialPost) )
router.get('/allpost', verifyJWT, (getAllPost))
// router.get('/:post_id', (getPost))

//post
router.post('/create', verifyJWT, (createPost))


//update
router.put("/:post_id/edit", verifyJWT, (editPost))


//delete
router.delete('/:post_id', verifyJWT, (deletePost)) //:user_id/




export { postRouter };