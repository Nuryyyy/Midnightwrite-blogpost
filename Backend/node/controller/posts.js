import { connectDatabase } from "../pool.js"
import { v4  as  uuidv4 } from  'uuid';

const  pool = connectDatabase()
// pool.connect

export const trialPost = (req, res) =>{
    res.json("test is working")
}


export const getAllPost = async (req, res) => {
    try{
        let lists = await pool.query(`SELECT * FROM public.createpost`) 
        
        // res.json(lists.rows)
        res.status(200).json(
            lists.rows
            );
        console.log(lists.rows)
  
        
        console.log("User:", req.user.username)
        console.log("token:", )
      
        // console.log(accessToken)

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

        const date = new Date()
        console.log("date:", date)
    
        
        const newPost = await pool.query(`INSERT INTO createpost (post_id, user_id, title, description, datepost) VALUES ($1, $2, $3, $4, $5) RETURNING *`, [uuidv4(), user_id, title, description, date])
        
        console.log(newPost.rows[0])
        res.status(200).json(
            newPost.rows[0]
        )

    } catch (error) {
        console.error(error.message);
        res.status(500).send({
            msg: "ERROR"
        });
    }
}

//getpost wit post_id
export const getPost = async (req, res) => {
    try{
        
        
        const post_id = req.params.post_id
        
        const post = await pool.query(`SELECT * FROM public.createpost WHERE post_id = $1`, [post_id]) 
        console.log(post.rows)
        const user_id = post.rows[0].user_id
        console.log(user_id)
        const user =  await pool.query(`SELECT * FROM public.user_info WHERE user_id = $1`, [user_id])
        const username = user.rows[0].username
        console.log("username:", username )
        
        res.status(200).json(post.rows, "username:", username)
    
        
        } catch (error) {
            // console.error(err.message);
            res.status(500).send({
                msg: "Unauthenticated"
            });
        }
}

export const editPost = async (req, res) => {
    try {
        const post_id = req.params.post_id
        const user_id = req.user.user_id
        console.log(`postid: ${post_id}
        user_id: ${user_id}`)

        //allow only user to edit its own post. should not be allowed to edit post of others
        const {description} = req.body
        console.log("edited description:", description)

        const posts =  await pool.query(`SELECT * FROM public.createpost WHERE post_id = $1`, [post_id])
        const userID = posts.rows[0].user_id
        console.log(posts.rows[0])
        console.log("userID:", userID)
        if (user_id === userID) {
            const edited = await pool.query(`UPDATE public.createpost SET description = $1 WHERE post_id = $2`, [description, post_id]) 
            res.status(200).json(description)
            console.log("Successfully edited")
        } else {
            res.send("You are not the owner of the post! You can't edit it!")
        }

    } catch (error) {
        console.log(error)
        
    }
}

export const deletePost =  async (req, res) => {
    try {
        const post_id = req.params.post_id
        const user_id = req.user.user_id
        console.log(`postid: ${post_id}
                    user_id: ${user_id}`)
        // username: ${username}`)

        //this will query the userid of the params post, if match to current user(owner) then allow delete post
        const posts =  await pool.query(`SELECT * FROM public.createpost WHERE post_id = $1`, [post_id])
        const userID = posts.rows[0].user_id
        console.log("userID:", userID)
        if (user_id === userID) {
            const deleted = await pool.query(`DELETE FROM public.createpost WHERE post_id = $1`, [post_id])
            res.status(200).json("Successfully deleted")
            console.log("deleted")
        } else {
            res.send("You are not the owner of the post! You can't delete it!")
        }

    } catch (error) {
        console.log(error)
    }
}
