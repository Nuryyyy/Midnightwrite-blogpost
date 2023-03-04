import { connectDatabase } from  "./pool.js";
import bodyParser  from  "body-parser";
import express, { request }  from  "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { corsOptions } from "./config/corsOptions.js";
//import { errorHandle } from "./middleware/errorHandle.js";
// import { credentials } from "./middleware/credentials.js";
import { verifyJWT } from "./middleware/verifyJWT.js";
import upload from "./middleware/upload.js";

//import pagesrouter
import { postRouter } from "./routes/posts.js";
import { userSessionRouter } from "./routes/users.js";
import { commentRouter } from "./routes/comment.js"; 
import { accountRouter } from "./routes/viewaccount.js";
import { refreshLogin } from "./routes/refreshUsers.js";

const pool = connectDatabase()
const app = express()
const PORT = 8000
// const uploadimage = multer({dest: './upload'})

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
// app.use("/upload", express.static("../../Frontend/reactjs/public/upload")); 
app.use("/upload", express.static("../client/public/upload")); //requestfile

//use of routers
app.use('', userSessionRouter)
app.use('', refreshLogin)
app.use('/post', postRouter) //can also put auth here instead in route foler
app.use('/comment', commentRouter)
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
        console.error(error.message);
        res.status(500).send({
            msg: "Unauthenticated"
        });
    }
}
)

app.get('/api/:user_id', verifyJWT, async (req, res) => {
    try{
        const user_id =  req.params.user_id
    const list = await pool.query(`SELECT * FROM public.user_info WHERE user_id = $1`, [user_id]) 
    
    res.json(list.rows)
    console.log(list.rows)
    
    } catch (error) {
        console.error(error.message);
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

//route to upload photo
app.post("/upload", (req, res, next) => {
    upload.single('image')(req, res, function (error) {
      if (error) {
        console.log(`upload.single error: ${error}`);
        return res.sendStatus(500);
      }
    const image = req.file
    console.log("imagefilename:",image.filename)
    // console.log("reqfile:", req.file)
    res.status(200).json(image.filename)
    })
  });

