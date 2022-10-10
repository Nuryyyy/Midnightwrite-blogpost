import { connectDatabase } from  "./pool.js";
import bodyParser  from  "body-parser";
import express  from  "express";
import bcrypt  from  "bcryptjs"
import { v4  as  uuidv4 } from  'uuid';
import { generateJwt } from  "./jwt/jwtGenerator.js";
import { auth } from  "./middleware/auth.js";
import cors from "cors";
import { postRouter } from "./routes/posts.js";
import { registerRouter } from "./routes/users.js";


const pool = connectDatabase()
const app = express()
const PORT = 8000
const Cors = cors()

//import routers
// const postRouter = router()

app.use(express.json())
app.use(bodyParser.urlencoded({ extended:  true }))
app.use(Cors)


//use of routers
app.use('/posts', postRouter)
app.use('', registerRouter)

//to connect with pool
pool.connect((err) => {
	if (err) {
		console.log(err) 
	}
	else {
		app.listen(PORT, () => {
			console.log(`Server has started on http://localhost:${PORT}`)
		})
	}
})

//  welcome message
app.get('/home',  (req, res)  =>  { 
    res.json(
	    { info:  'Hello welcome to midnightwrite' }
    )  
})



// // provide the auth middleware
// app.get('/verify', auth, async (req, res) => {
//    
// })

//this shoud only be access by the admin, this will further be updated.
app.get('/api', async (req, res) => {
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




