import  jwt  from  "jsonwebtoken"
import  dotenv  from  "dotenv"
dotenv.config();

const  refreshToken = (user) => {
	return  jwt.sign(user, process.env.refreshTokenJwt, { expiresIn:  '1d' })
}
export { refreshToken }