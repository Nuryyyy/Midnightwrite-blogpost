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

//getpost wit post_id
export const getPost = async (req, res) => {
    try{
        
        
        // const post_id = req.params.post_id
        const postID = req.params.post_id
        
        const post = await pool.query(`SELECT * FROM public.createpost WHERE post_id = $1`, [postID]) 
        console.log(post.rows)
        // const user_id = post.rows[0].user_id
        const userID = post.rows[0].user_id
        // console.log(user_id)
        const user =  await pool.query(`SELECT * FROM public.user_info WHERE user_id = $1`, [userID])
        const username = user.rows[0].username
        console.log("username:", username )
        
        const {user_id, ... other} = post.rows[0]
        
    // const user = await pool.query(`SELECT * FROM public.user_info WHERE username = $1`, [username])
        res.status(200).json(other, "username:", username)
        // res.send(`${JSON.stringify(post.rows)},  
        // Username: ${username}`)
       
        
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
            description,
            // datepost
        } = req.body 
        
        const user_id = req.user.user_id
        console.log(user_id)
        console.log("username:", req.user.username)
        // console.log("user_id:", user_id)
        
        

        const date = new Date()
        console.log("date:", date)
        // let user_id = user
        // const user = await pool.query(`SELECT * FROM public.createpost WHERE user_id = $1`, [user_id])
        // console.log(user)
        
        const newPost = await pool.query(`INSERT INTO createpost (post_id, user_id, title, description, datepost) VALUES ($1, $2, $3, $4, $5) RETURNING *`, [uuidv4(), user_id, title, description, date])
 
        // const accessToken = req.cookies
        // if (newPost.rows[0]) {
        //     // return res.json("success posted")
        //     res.json({
        //         title,
        //         description,
        //         accessToken //token 
        //     })
        //   }
        
        console.log(newPost.rows[0]) 
        res.status(200).json(
            // title,
            // description,
            newPost.rows[0]
        )

    } catch (error) {
        console.error(error.message);
        res.status(500).send({
            msg: "ERROR"
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
        const edited = await pool.query(`UPDATE public.createpost SET description = $1 WHERE post_id = $2`, [description, post_id]) 
        console.log(description)
        res.status(200).json(description)
        
    } catch (error) {
        console.log(error)
        
    }
}

export const deletePost =  async (req, res) => {
    try {
        const post_id = req.params.post_id
        // const username = req.params.username
        const user_id = req.user.user_id
        console.log(`postid: ${post_id}
        user_id: ${user_id}`)
        // username: ${username}`)

        //this will query the userid of the params post, if match to current user(owner) then allow delete post
        const posts =  await pool.query(`SELECT * FROM public.createpost WHERE post_id = $1`, [post_id])
        const userID = posts.rows[0].user_id
        console.log(posts.rows[0])
        console.log("userID:", userID)
        if (user_id === userID) {
            const deleted = await pool.query(`DELETE FROM public.createpost WHERE post_id = $1`, [post_id])
            res.status(200).json(deleted.rows[0])
            console.log("deleted")
        } else {
            res.send("You are not the owner of the post! You can't delete it!")
        }

    } catch (error) {
        console.log(error)
    }
}
// export const deletePost2 =  async (req, res) => {
//     try {
//         const token = req.cookies.SetCookie
//         if(!token) return res.status(401).json("Not authenticated, cannot delete")
        
//         jwt.verify(token, "jwtkey", (err, userInfo) => {
//             if (err) return res.status(403).json("Token is not valid!");
        
//         const post_id = req.params.post_id
//         // const username = req.params.username
//         const user_id = req.user.user_id
//         console.log(`postid: ${post_id}
//         user_id: ${user_id}`)
//         // username: ${username}`)

//         //this will query the userid of the params post, if match to current user(owner) then allow delete post
//         const posts =  await pool.query(`SELECT * FROM public.createpost WHERE post_id = $1`, [post_id])
//         const userID = posts.rows[0].user_id
//         console.log(posts.rows[0])
//         console.log("userID:", userID)
//         if (user_id === userID) {
//             const deleted = await pool.query(`DELETE FROM public.createpost WHERE post_id = $1`, [post_id])
//             res.status(200).json(deleted.rows[0])
//             console.log("deleted")
//         } else {
//             res.send("You are not the owner of the post! You can't delete it!")
//         }

//     } catch (error) {
//         console.log(error)
//     }
// }

export const createPost2 = async (req, res) => {
    
    try {
    
        const {
            username,
            user_id,
            title,
            description
            
            
            // datepost
        } = req.body 
        
        console.log("userid:",user_id)
        console.log("username:", username)
        // console.log("user_id:", user_id)
        
        

        const date = new Date()
        console.log("date:", date)
        // let user_id = user
        // const user = await pool.query(`SELECT * FROM public.createpost WHERE user_id = $1`, [user_id])
        // console.log(user)
        
        const newPost = await pool.query(`INSERT INTO createpost (post_id, user_id, title, description, datepost) VALUES ($1, $2, $3, $4, $5) RETURNING *`, [uuidv4(), user_id, title, description, date])
 
        // const accessToken = req.cookies
        // if (newPost.rows[0]) {
        //     // return res.json("success posted")
        //     res.json({
        //         title,
        //         description,
        //         accessToken //token 
        //     })
        //   }
        
        console.log(newPost.rows[0])
        res.status(200).json(
            // title,
            // description,
            newPost.rows[0]
        )

    } catch (error) {
        console.error(error.message);
        res.status(500).send({
            msg: "ERROR"
        });
    }
}