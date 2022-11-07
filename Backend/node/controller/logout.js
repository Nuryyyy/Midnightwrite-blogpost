
import { connectDatabase } from "../pool.js";
import  jwt  from  "jsonwebtoken"
const pool = connectDatabase()


//login user
const Logout = (req, res) => {
    //on client, also delete the accessToken
    const cookies = req.cookies;
    console.log("cookies:", cookies)
    if (!cookies?.SetCookie) return res.sendStatus(204).json("No content to sent back");
    const refreshToken = cookies.SetCookie
    console.log(refreshToken)

    res.clearCookie('SetCookie', refreshToken, {httpOnly: true})
    console.log("success clearcookie")
    return res.sendStatus(204)
            
}

export { Logout}