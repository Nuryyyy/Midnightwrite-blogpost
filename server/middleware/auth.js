import  jwt  from  "jsonwebtoken"
import  dotenv  from  "dotenv"
dotenv.config()

const  auth = (req, res, next) => {
	//this will check if a token is existing in the Authorization Header
	const  authHeader = req.header('Authorization')
	// const token = req.cookies.token
	
	if (!authHeader) {
		return  res.status(403).json({ err:  'Invalid token' })
		
		
	}
	console.log("authheader:", authHeader) //bearer token
	try {
		const token = authHeader.split(' ')[1]
		//this will take the token from the Authorization header then will use
		//jwt.verify function to process it
		// jwt.verify(token.slice(7), process.env.jwtSecret, (err, user) => {
			jwt.verify(token, process.env.jwtSecret, (err, user) => {
		if(err) return  res.sendStatus(403)
			//this will store the user payload in the request
			req.user = user//data of user
			// console.log(user) //bearer token
			// console.log("token:", token)
		next()
	});

	} catch (err) {
		res.status(401).json({ error:  err.message });
		// res.clearCookie("authheader") 
	}
}
export { auth }

export const verifyUser = (req, res, next) => {
	auth(req, res, () => {
		if (req.user.user_id === req.params.user_id) { //can also add if req.user.isAdmin
			next() 
			// console.log("userid:", req.user.user_id)
			// console.log("userid:", req.params.user_id)
	} else {
		if(err) return  res.sendStatus(403).json({ err: 'You are not authorized' })
		// console.log(err)
	}

	})

}

//verify admin
// export const verifyAdmin = (req, res, next) => {
// 	auth(req, res, () => {
// 		if (req.user.isAdmin) { //can also add if req.user.isAdmin
// 			next() 
// 			// console.log("userid:", req.user.user_id)
// 			// console.log("userid:", req.params.user_id)
// 	} else {
// 		if(err) return  res.sendStatus(403).json({ err: 'You are not authorized' })
// 		// console.log(err)
// 	}

// 	})

// }