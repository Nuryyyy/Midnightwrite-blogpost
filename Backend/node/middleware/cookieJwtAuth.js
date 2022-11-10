import  jwt  from  "jsonwebtoken"

const cookieJwtAuth = (req, res, next) => {
    const token =  req.cookies.accessToken
    // const token =  authHeader.split(' ')[1]
    console.log("cookieTOken:", token)

    
    try {
            jwt.verify(token, process.env.jwtSecret, (err, user) => {
            if (err) return res.status(403).json("Token is not valid! cookieJwtAuth");
            // req.user = user
            req.user = user
            next()
        })
        
    } catch (error) {
        console.log(error)
        // res.clearCookie("token")
        // return res.redirect("/")
        
    }
}

export {cookieJwtAuth}

