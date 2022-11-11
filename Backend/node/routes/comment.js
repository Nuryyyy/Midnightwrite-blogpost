import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { addComment, trialComment } from "../controller/comments.js";
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
router.get('trial', (trialComment))

//post
router.post('/comment', (addComment))







export { commentRouter };
