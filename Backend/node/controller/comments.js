import { connectDatabase } from "../pool.js"
import { v5  as  uuidv5 } from  'uuid';

const  pool = connectDatabase()
// pool.connect

export const trialComment = (req, res) =>{
    res.json("comments is working")
}


export const addComment = async (req, res) => {
    try {
 
        const {
           body
        } = req.body 

        const post_id = req.user.post_id
        console.log(post_id)
        const user_id = req.user.user_id
        console.log(user_id)
        const username = req.user.username
        console.log(username)

        const date_comment = new Date()
        // let user_id = user
        // const user = await pool.query(`SELECT * FROM public.createpost WHERE user_id = $1`, [user_id])
        // console.log(user)
        
        const comment = await pool.query(`INSERT INTO postcomments (comment_id, post_id, user_id, date_comment, body) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`, [uuidv5(), post_id, user_id, username, date_comment, body])
        // newPost.rows[0]
       
        if (comment.rows[0]) {
            return res.json("success posted")
          }

    } catch (error) {
        console.error(error.message);
        res.status(500).send({
            msg: "Sign in first"
        });
    }
}

// export const getPost = async (req, res) => {
//     try{
//         let lists = await pool.query(`SELECT * FROM public.createpost`) 
        
//         res.json(lists.rows)
//         console.log(lists.rows)

//         // res.send("getPost is working")
        
        
//         } catch (error) {
//             // console.error(err.message);
//             res.status(500).send({
//                 msg: "Unauthenticated"
//             });
//         }
// }