import { Router } from "express";
import { deleteUser, updateUser,viewAccount, uploadImage, getImage, putDescription } from "../controller/viewaccount.js";
import { verifyJWT } from "../middleware/verifyJWT.js";
import upload from "../middleware/upload.js";


const accountRouter = Router()
let router = accountRouter

router.get('/', verifyJWT, viewAccount)
router.get('/:username', verifyJWT, viewAccount)
router.get('/image', verifyJWT, getImage)

router.put('/:user_id/update', verifyJWT, updateUser)
router.put('/upload', verifyJWT, uploadImage)
router.put('/aboutme', verifyJWT, putDescription)

router.delete('/:user_id/delete', verifyJWT, deleteUser)

export {accountRouter}