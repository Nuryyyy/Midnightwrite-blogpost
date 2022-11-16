import { Router } from "express";
import { loginRefreshToken } from "../controller/refreshTokenUser.js";
import { verifyJWT } from "../middleware/verifyJWT.js";

// import cookieParser from "cookie-parser";
 

const refreshLogin = Router()
let router = refreshLogin

router.get('/refresh', (loginRefreshToken))

export { refreshLogin };
