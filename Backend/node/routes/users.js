import { connectDatabase } from "../pool.js";
import bodyParser  from  "body-parser";
import express  from  "express";
import bcrypt  from  "bcryptjs"
import { v4  as  uuidv4 } from  'uuid';
import { generateJwt } from "../jwt/jwtGenerator.js"
import { auth } from  "../middleware/auth.js";
import cors from "cors";
import { Router } from "express";
// import { generateJwt } from  "./jwt/jwtGenerator.js";

const  pool = connectDatabase()
const  app = express()
const  PORT = 8000
const  Cors = cors()

app.use(express.json())
app.use(bodyParser.urlencoded({ extended:  true }))
app.use(Cors)

const route = Router()

// create account for new user
app.post('/register', async (req, res) => {
    try {
        //take the username and password from the req.body
        const {
            fname,
            lname,
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
        
        const newUser = await pool.query(`INSERT INTO user_info (user_id, fname, lname, username, email, password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`, [uuidv4(), fname, lname, username, email, bcryptPassword])
        
        //generate and return the JWT token
        const token = generateJwt(newUser.rows[0])

        res.json({
            token
        })
    } catch (error) {

        console.log(error.message)
        res.status(500).send(error.message)
    }


})

app.post('/login', async (req, res) => {
    try {

        //take the username and password from the req.body
        const {
            username,
            password
        } = req.body;

        //Check if the user is not existing
        const user = await pool.query(`SELECT * FROM public.user_info WHERE username = $1`, [username])

        if (user.rows.length <= 0) {
            // res.status(401).send("User does not exists") //[nodemon] app crashed - waiting for file changes before starting...
            // return res.status(401).json("User does not existsss")
            return res.status(401).send({error: "User does not exists"})
        }

        //Check if the password matches using bcrypt
        const validPassword = await bcrypt.compare(password, user.rows[0].password)
        if (!validPassword) {
            return res.status(401).send({error: "Password is incorrect."})
        }

        // if username and password is wrong
        // if ( user.rows.length <= 0 && !validPassword) {
        //     return res.status(401).send({error: "Password or username does not match."})
        // }

        //generate and return the JWT
        const token = generateJwt(user.rows[0])
        console.log("success login")
        res.json({
            token
        })


    } catch (error) {
        console.error(error.message);
        res.status(500).send({
            msg: "Unauthenticated"
        });
    }
})

// provide the auth middleware
app.get('/verify', auth, async (req, res) => {
    try {

        //return the user object
        res.json(req.user)
    } catch (error) {
        console.error(err.message);
        res.status(500).send({
            msg: "Unauthenticated"
        });
    }
})


route.get('/api', async (req, res) => {
    try{
    let list = await pool.query(`SELECT * FROM public.user_info`) 
    
    res.json(list.rows)
    console.log(list.rows)
    
    } catch (error) {
        console.error(err.message);
        res.status(500).send({
            msg: "Unauthenticated"
        });
    }
}
)


//trial

// route.get('/', (req, res) => {
//     res.json(
// 	    { info:  'Hello welcome to midnightwrite user' }
//     )
//     console.log("/user is working")
// })

// route.get('/test', (req, res) => {
//     res.json(
// 	    { info:  'In test user' }
//     )
//     console.log("/test is working")
// })

export { app };