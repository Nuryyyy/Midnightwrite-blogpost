import { Router } from "express";
import { register, login, verifyuser } from "../controller/users.js";
import { viewAccount } from "../controller/viewaccount.js";
import { verifyJWT } from "../middleware/verifyJWT.js";


const accountRouter = Router()
let router = accountRouter

// router.get('/:username', auth, ViewAccount)
router.get('/', verifyJWT, viewAccount)

export {accountRouter}