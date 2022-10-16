import { connectDatabase } from "../pool.js"
import { v4  as  uuidv4 } from  'uuid';

const  pool = connectDatabase()
// pool.connect

export const trialPost = (req, res) =>{
    res.json("test is working")
}


export const getPost = async (req, res) => {
    try{
        let lists = await pool.query(`SELECT * FROM public.createpost`) 
        
        res.json(lists.rows)
        console.log(lists.rows)

        // res.send("getPost is working")
        
        
        } catch (error) {
            // console.error(err.message);
            res.status(500).send({
                msg: "Unauthenticated"
            });
        }
}


export const createPost = async (req, res) => {
    try {
 
        const {
            title,
            description
        } = req.body 

        
        const user_id = req.user.user_id
        console.log(user_id)

        const date = new Date()
        // let user_id = user
        // const user = await pool.query(`SELECT * FROM public.createpost WHERE user_id = $1`, [user_id])
        // console.log(user)
        
        const newPost = await pool.query(`INSERT INTO createpost (post_id, user_id, title, description, datepost) VALUES ($1, $2, $3, $4, $5) RETURNING *`, [uuidv4(), user_id, title, description, date])
        // newPost.rows[0]
       
        if (newPost.rows[0]) {
            return res.json("success posted")
          }

    } catch (error) {
        console.error(error.message);
        res.status(500).send({
            msg: "Sign in first"
        });
    }
}
