import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { addComment, getComment, trialComment } from "../controller/comments.js";
import { verifyJWT } from "../middleware/verifyJWT.js";
const commentRouter = Router()

let router = commentRouter

//trial
router.get('/', (req, res) => {
    res.json(
	    { info:  'Hello welcome to midnightwrite router' }
    )
    console.log("/posts is working")
})

//get
router.get('/:post_id', verifyJWT, (getComment))

//post
router.post('', verifyJWT, (addComment))







export { commentRouter };
