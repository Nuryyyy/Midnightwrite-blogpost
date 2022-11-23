import { connectDatabase } from  "./pool.js";
import bodyParser  from  "body-parser";
import express  from  "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { corsOptions } from "./config/corsOptions.js";
// import multer from "multer"; //for photo file
import upload from "./middleware/upload.js";
//import { errorHandle } from "./middleware/errorHandle.js";
// import { credentials } from "./middleware/credentials.js";
import { verifyJWT } from "./middleware/verifyJWT.js";

//import pagesrouter
import { postRouter } from "./routes/posts.js";
import { userSessionRouter } from "./routes/users.js";
import { commentRouter } from "./routes/comment.js"; 
import { accountRouter } from "./routes/viewaccount.js";
import { refreshLogin } from "./routes/refreshUsers.js";
// import session from "express-session"

const pool = connectDatabase()
const app = express()
const PORT = 8000
// const upload = multer({dest: './upload'})

//custome middleware logger
app.use((req,res, next) =>{
    console.log(`${res} ${req.path}`)
    next()
})

//middleware
app.use(bodyParser.urlencoded({ extended:  true }))
app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser())  //middleware for cookies
// app.use(credentials)
app.use("./upload", express.static("file"));

app.post('/upload', upload.single("file"), function(req, res){
    const file = req.file
    res.status(200).json("file.filename")
})
//use of routers
app.use('', userSessionRouter)
app.use('', refreshLogin)
app.use('/posts', postRouter) //can also put auth here instead in route foler
app.use('/post', commentRouter)
app.use('', commentRouter)
app.use('/profile',accountRouter)


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
app.get('/',  (req, res)  =>  { 
    res.json(
	    { info:  'Hello welcome to midnightwrite' }
    )  
})



//this shoud only be access by the admin, this will further be updated.
app.get('/api', verifyJWT, async (req, res) => {
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

//displays the error on the page
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send(err.message)
})