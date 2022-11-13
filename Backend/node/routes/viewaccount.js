import { Router } from "express";
import { register, login, verifyuser } from "../controller/users.js";
import { deleteUser, updateUser, ViewAccount } from "../controller/viewaccount.js";
import { verifyJWT } from "../middleware/verifyJWT.js";


const accountRouter = Router()
let router = accountRouter

router.get('/', verifyJWT, ViewAccount)

router.put('/edit/:user_id', verifyJWT, updateUser)

router.delete('/edit/:user_id',verifyJWT, deleteUser)

export {accountRouter}