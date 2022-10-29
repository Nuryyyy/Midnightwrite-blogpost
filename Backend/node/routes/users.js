import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { register, login, verifyuser } from "../controller/users.js";
// import cookieParser from "cookie-parser";
 
// router.use(cookieParser())
const registerRouter = Router()
let router = registerRouter

// router.use(cookieParser())

router.get('', (req, res) => {
    res.json(
	    { info:  'Hello welcome to midnightwrite registration'}
    )
    console.log("register is working")
})

//get
router.get('/verify', auth, (verifyuser))

//post
router.post('/register', (register))
router.post('/login', (login))


export { registerRouter };