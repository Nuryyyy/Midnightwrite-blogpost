import { Router } from "express";
import { deleteUser, updateUser,viewAccount } from "../controller/viewaccount.js";
import { verifyJWT } from "../middleware/verifyJWT.js";


const accountRouter = Router()
let router = accountRouter

router.get('/', verifyJWT, viewAccount)
router.get('/:username', verifyJWT, viewAccount)

router.put('/:user_id/update', verifyJWT, updateUser)

router.delete('/:user_id/delete', verifyJWT, deleteUser)

export {accountRouter}