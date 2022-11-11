import { Router } from "express";
import { loginRefreshToken } from "../controller/refreshTokenUser.js";
 

const refreshLogin = Router()
let router = refreshLogin

router.get('/refresh', (loginRefreshToken))

export { refreshLogin };


// router.route('/')   
//     .get()