import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { register, login, verifyuser } from "../controller/users.js";
import { ViewAccount } from "../controller/viewaccount.js";


const AccountRouter = Router()
let router = AccountRouter

router.get('/:username', ViewAccount)

export {AccountRouter}