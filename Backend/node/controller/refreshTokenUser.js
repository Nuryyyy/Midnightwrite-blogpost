
import { connectDatabase } from "../pool.js";
import  jwt  from  "jsonwebtoken"
import  dotenv  from  "dotenv"
dotenv.config();


const pool = connectDatabase()


//login user
const loginRefreshToken = async (req, res) => {

//         const {
//             cookies
//         } = req.cookies
//         console.log(cookies)
//         // if (!cookies?.jwt) return res.status(401).json("cookies toh")
//         console.log(cookies?.jwt)
//         const refreshToken =  cookies.jwt
//         //Check if the user is not existing
//         const username = req.user.cookie.username
//         const user =  pool.query(`SELECT * FROM public.user_info WHERE username = $1`, [username])
        
//         if (user.rows.length <= 0) {
//             // res.status(401).send("User does not exists") //[nodemon] app crashed - waiting for file changes before starting...
//             // return res.status(401).json("User does not existsss")
//             console.log("failed login")
//             return res.status(401).send({error: "User does not exists"})
//         }

//         //evaluate jwt
//         jwt.verify(
//             refreshToken,
//             process.env.refreshTokenJwt, 
//             (err, user) => { //decoded
//                 if (err || user.username !== user.username) return res.sendStatus(403)
//                 // req.user =  decoded
//                 const accessToken = jwt.sign(
//                    {"username": user.username},
//                    process.env.jwtSecret, 
//                    {expiresIn: '30s'}
//                 )
//                 res.json({accessToken})
                
//             }
                
            
//         )      
        
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send({
//             msg: "Unauthenticated"
//         });
//     }
// }
    const cookies = req.cookies;
    console.log("cookies:", cookies)
    if (!cookies?.jwtcookie) return res.sendStatus(401).json("cookies toh");
    const refreshToken = cookies.jwtcookie;
    console.log("refreshtoken:", refreshToken)

    // evaluate jwt 
    jwt.verify(
        refreshToken,
        process.env.refreshTokenJwt,
        (err, user) => {
            if (err) return res.sendStatus(403);
            const accessToken = jwt.sign(
                { "username": user.username },
                process.env.jwtSecret,
                { expiresIn: '1m' }
            );
            res.json({ accessToken })
            console.log(user.username)
        }
    );
}

export { loginRefreshToken}




