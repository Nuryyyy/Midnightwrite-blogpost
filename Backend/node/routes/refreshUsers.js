import { Router } from "express";
import { loginRefreshToken } from "../controller/refreshTokenUser.js";

// import cookieParser from "cookie-parser";
 

const refreshLogin = Router()
let router = refreshLogin

// router.use(cookieParser())



router.get('/refresh', (loginRefreshToken))


export { refreshLogin };


// router.route('/')   
//     .get()