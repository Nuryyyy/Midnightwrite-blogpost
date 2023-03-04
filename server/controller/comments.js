import { connectDatabase } from "../pool.js"
import { v4  as  uuidv4 } from  'uuid';

const  pool = connectDatabase()
// pool.connect

export const trialComment = (req, res) =>{
    res.json("comments is working")
}


export const addComment = async (req, res) => {
    try {
 
        const {
           post_id,
            body,
            username,
            image
        } = req.body 

        // const image = req.user.image
        console.log("imageb:", image)
        const user_id = req.user.user_id
    

        const comment_date = new Date()
        console.log("Date:", comment_date)
      
        
        const comment = await pool.query(`INSERT INTO post_comments (comment_id, post_id, user_id, body, comment_date, username, image) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`, [uuidv4(), post_id, user_id, body, comment_date, username, image])
        // newPost.rows[0]
       
        if (comment.rows[0]) {
            return res.json("success posted")
          }

    } catch (error) {
        console.error(error.message);
        res.status(500).send({
            msg: "Error"
        });
    }
}

export const getComment = async (req, res) => {
    try{
        const post_id = req.params.post_id
        
        const comment = await pool.query(`SELECT * FROM public.post_comments WHERE post_id = $1`,[post_id]) 
        
        res.status(200).json(comment.rows)
        console.log(comment.rows)

        // res.send("getPost is working")
        
        
        } catch (error) {
            console.error(error.message);
            res.status(500).send({
                msg: "Unauthenticated"
            });
        }
}