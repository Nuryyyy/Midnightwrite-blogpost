import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { register, login, verifyuser } from "../controller/users.js";

const registerRouter = Router()
let router = registerRouter

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