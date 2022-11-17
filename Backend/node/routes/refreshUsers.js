
import { Router } from "express";
import { loginRefreshToken } from "../controller/refreshTokenUser.js";
import { verifyJWT } from "../middleware/verifyJWT.js";

const refreshLogin = Router()
let router = refreshLogin

router.get('/refresh', (loginRefreshToken))

export { refreshLogin };