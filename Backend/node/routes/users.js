import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { register, login, verifyuser } from "../controller/users.js";
import { verifyJWT } from "../middleware/verifyJWT.js";
import { Logout } from "../controller/logout.js";
 

const userSessionRouter = Router()
let router = userSessionRouter

// router.use(cookieParser())

// router.use(cookieParser())

router.get('', (req, res) => {
    res.json(
	    { info:  'Hello welcome to midnightwrite registration'}
    )
    console.log("register is working")
})

//get
router.get('/verify', verifyJWT, (verifyuser))
router.get('/logout', (Logout))

//post
router.post('/register', (register))
router.post('/login', (login))


export { userSessionRouter };


// router.route('/')   
//     .get()