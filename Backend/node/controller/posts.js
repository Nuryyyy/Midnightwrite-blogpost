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
            user_id, //how to not require the user to insert user_id when posting, instead it should automatically fill up the table since they are logged in already. 
            title,
            description
        } = req.body 

        
        const date = new Date()
        // let user_id = user
        // const user = await pool.query(`SELECT * FROM public.createpost WHERE user_id = $1`, [user_id])
        // console.log(user)
        
        const newPost = await pool.query(`INSERT INTO createpost (post_id, user_id, title, description, datepost) VALUES ($1, $2, $3, $4, $5) RETURNING *`, [uuidv4(), user_id, title, description, date])
        // newPost.rows[0]

        if (newPost.rows[0]) {
            return res.json("sucess posted")
          }

    } catch (error) {
        console.error(error.message);
        res.status(500).send({
            msg: "Sign in first"
        });
    }
}

// router.post('/create', async (req, res) => {
//     try {

//         //take the info for creating new post
//         const {
//             title,
//             description
//         } = req.body 

//         res.send('Success');
 
//         const date = Date.now
//         const newPost = await pool.query(`INSERT INTO createpost (post_id, user_id, title, description, datepost) VALUES ($1, $2, $3, $4, $5) RETURNING *`, [uuidv5(), user_id, title, description, date])

//         // const token = generateJwt(newPost.rows[0])
//         // res.json({
//         //     token
//         // })
//         newPost.rows[0].save()

//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send({
//             msg: "Sign in first"
//         });
//     }
//     console.log('create is working')
// }

// )