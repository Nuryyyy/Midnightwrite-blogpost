
import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { trialPost,createPost, getPost } from "../controller/posts.js";
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
router.get('/test', auth, (trialPost) )
router.get('/allpost', auth, (getPost))

//post
router.post('/create', auth, (createPost))







export { postRouter };