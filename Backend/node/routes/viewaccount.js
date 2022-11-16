import { Router } from "express";
import { deleteUser, updateUser,viewAccount } from "../controller/viewaccount.js";
import { verifyJWT } from "../middleware/verifyJWT.js";



const accountRouter = Router()
let router = accountRouter

router.get('/', verifyJWT, viewAccount)

router.put('/edit/:user_id', verifyJWT, updateUser)

router.delete('/edit/:user_id',verifyJWT, deleteUser)

export {accountRouter}

