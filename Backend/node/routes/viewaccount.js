import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { register, login, verifyuser } from "../controller/users.js";
import { ViewAccount } from "../controller/viewaccount.js";


const accountRouter = Router()
let router = accountRouter

// router.get('/:username', auth, ViewAccount)
router.get('/profile', auth, ViewAccount)

export {accountRouter}