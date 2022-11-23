import { connectDatabase } from "../pool.js";
import bcrypt  from  "bcryptjs"
import { v4  as  uuidv4 } from  'uuid';
import { generateJwt } from "../jwt/jwtGenerator.js"
import { refreshToken } from "../jwt/refreshToken.js";

// import cors from "cors";

const  pool = connectDatabase()
// const cookies = cookieParser()

export const trialRegister = (req,res) => {
    res.json("registration is working")
}


// create account for new user
export const register = async (req, res) => {
    try {
        //take the username and password from the req.body
        const {
            firstname,
            lastname,
            username,
            email,
            password
        } = req.body

        //Check if the user is already existing
        const user = await pool.query(`SELECT * FROM public.user_info WHERE username = $1`, [username])

        if (user.rows.length > 0) {
            res.status(401).send("Username is already taken")
        }

        //Setup Bcrypt for password hashing
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);

        const bcryptPassword = await bcrypt.hash(password, salt);

        //Add the new user into the database
        //generate the uuid using the uuidv4() function
        const newUser = await pool.query(`INSERT INTO user_info(user_id, firstname, lastname, username, email, password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`, [uuidv4(), firstname, lastname, username, email, bcryptPassword])
        
        //generate and return the JWT
        const accessToken = generateJwt(newUser.rows[0]) //accessToken
        console.log("Access Token:", accessToken)
        //token
    
        //refreshToken
        // const currentUser = {...user, refreshToken}
        const refresh_Token = refreshToken(newUser.rows[0])
        console.log("Refreshtoken:", refresh_Token)
        
        // const userID = await pool.query(`SELECT * FROM public.user_info WHERE user_id = $1`, [user_id])
        const user_id = newUser.rows[0].user_id
        console.log("userid:", user_id)

        // store token to cookie
        res.cookie('SetCookie', refresh_Token, {httpOnly: true, 
            maxAge: 86400000 //day 
            // ,secure: true,
            // sameSite: 'None'

            }
        ).status(200).json({username, user_id, password, accessToken})


        console.log("success register")
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send({
            msg: "Unauthenticated"
        });
    }

}


//login user
export const login = async (req, res) => {
        try {

        //take the username and password from the req.body
        const {
            username,
            password
        } = req.body;

        //Check if the user is not existing
        const user = await pool.query(`SELECT * FROM public.user_info WHERE username = $1`, [username])

        if (user.rows.length <= 0) {
            console.log("failed login")
            return res.status(401).send({error: "User does not exists"})
        }

        //Check if the password matches using bcrypt
        const validPassword = await bcrypt.compare(password, user.rows[0].password)
        if (!validPassword) {
            console.log("failed login")
            return res.status(401).send({error: "Password is incorrect."})
            
        }
    
        //generate and return the JWT
        const accessToken = generateJwt(user.rows[0]) //accessToken
        console.log("Access Token:", accessToken)
        //token

        const refresh_Token = refreshToken(user.rows[0])
        console.log("Refreshtoken:", refresh_Token)
        
        const user_id = user.rows[0].user_id

        // store token to cookie
        res.cookie('SetCookie', refresh_Token, {httpOnly: true, 
            maxAge: 86400000 //day 
            // ,secure: true,
            // sameSite: 'None'
            }
        ).status(200).json({username, user_id, password, accessToken})
        
        console.log("success login")

    } catch (error) {
        console.error(error.message);
        res.status(500).send({
            msg: "Unauthenticated"
        });
    }
}


//verify
export const verifyuser = async (req, res) => {
        try {

                //return the user object
                res.json(req.user)
                console.log("verified")
                console.log(user.rows)

            } catch (error) {
                console.error(error.message);
                res.status(500).send({
                    msg: "Unauthenticated"
                });
            }
}