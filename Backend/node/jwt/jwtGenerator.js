import  jwt  from  "jsonwebtoken"
import  dotenv  from  "dotenv"
dotenv.config();

const  generateJwt = (user) => {
	return  jwt.sign(user, process.env.jwtSecret, { expiresIn:  '1hr' })
} //1h or 15m talaga dapat
export { generateJwt }