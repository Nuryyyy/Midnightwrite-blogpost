import  jwt, { decode }  from  "jsonwebtoken"
import  dotenv  from  "dotenv"
dotenv.config()

const verifyJWT = (req, res, next) => {
    const authHeader = req.header('Authorization')
    if(!authHeader) return res.status(403).json({ err:  'Invalid token' });
    console.log(authHeader) //bearer token
    const token = authHeader.split(' ')[1]
    jwt.verify(
        token,
        process.env.jwtSecret, 
        (err, user) => {
            if (err) return res.sendStatus(403)
            req.user =  user
            next()
        }
            
        
    )
}

export {verifyJWT}