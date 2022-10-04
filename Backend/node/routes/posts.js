
import { Router } from "express";
import { auth } from "../middleware/auth.js";

const router = Router()

//trial
router.get('/', (req, res) => {
    res.json(
	    { info:  'Hello welcome to midnightwrite router' }
    )
    console.log("/posts is working")
})

router.get('/test', (req, res) => {
    res.json(
	    { info:  'In test' }
    )
    console.log("/test is working")
})

// router.get('/new', auth, (req, res) => {
//     res.render('posts/new')
// }
// )

router.post('/create', async (req, res) => {
    try {

        //take the info for creating new post
        const {
            title,
            description
        } = req.body;

        res.send('Success');
 
        const date = Date.now
        const newPost = await pool.query(`INSERT INTO post (blog_id, user_id, title, decription, date) VALUES ($1, $2, $3, $4, $5) RETURNING *`, [uuidv5(), user_id, title, description, date])

        const token = generateJwt(newPost.rows[0])
        res.json({
            token
        })
    } catch (error) {
        console.error(error.message);
        res.status(500).send({
            msg: "Sign in first"
        });
    }
    console.log('create is working')
}

)

// router.post('/create',  async (req, res) => {
    
//     const book = req.body;
//     console.log(book); 
//     res.send('Book is added to the database');
// }

// )



export { router };