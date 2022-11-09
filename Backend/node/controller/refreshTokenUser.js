
// import { connectDatabase } from "../pool.js";
import  jwt  from  "jsonwebtoken"
import  dotenv  from  "dotenv"
dotenv.config();

// const pool = connectDatabase()

//login user
const loginRefreshToken = async (req, res) => {

    const cookies = req.cookies;
    console.log("cookies:", cookies)
    if (!cookies?.SetCookie) return res.sendStatus(401).json("cookies toh");
    const refreshToken = cookies.SetCookie;
    console.log("refreshtoken:", refreshToken)

    // evaluate jwt 
    jwt.verify(
        refreshToken,
        process.env.refreshTokenJwt,
        (err, user) => {
            if (err) return res.sendStatus(403);
            const accessToken = jwt.sign(
                {user} ,
                process.env.jwtSecret,
                { expiresIn: '1h' }
            );
            res.json({accessToken })
            console.log("user:", user.username)
            console.log("newaccesstoken:", accessToken)
        }
    );
}

export { loginRefreshToken}




