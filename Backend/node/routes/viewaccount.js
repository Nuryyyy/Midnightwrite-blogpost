import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { register, login, verifyuser } from "../controller/users.js";
import { ViewAccount, updateUser } from "../controller/viewaccount.js";
import { verifyUser } from "../middleware/auth.js";
import { verifyJWT } from "../middleware/verifyJWT.js";

const accountRouter = Router()
let router = accountRouter

// router.get('/:username', verifyJWT, ViewAccount)
router.get('', verifyJWT, ViewAccount)

// router.put('/:user_id/edit', verifyUser, updateUser)

export {accountRouter}