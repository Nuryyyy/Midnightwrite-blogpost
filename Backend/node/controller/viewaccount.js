import { connectDatabase } from "../pool.js"
const  pool = connectDatabase()


//account
export const ViewAccount = async (req, res) => {
    try{ 
        
        // const username = req.params.username
        const username = req.user.username
        const user = await pool.query(`SELECT * FROM public.user_info WHERE username = $1`, [username]) 
        console.log(user.rows)

        const {password, user_id, ...other} = user.rows
    // const user = await pool.query(`SELECT * FROM public.user_info WHERE username = $1`, [username])
        res.json(user.rows)
            // res.json(`
            // Details:
            //     Username:  ${user.rows[0].username}
            //     Firstname: ${user.rows[0].firstname}  
            //     Lastname:  ${user.rows[0].lastname}
            //     Email:  ${user.rows[0].email}
            //     `)
       
    }  catch (error) {
        console.error(error.message);
    }

}

//update user info
export const updateUser = async (req, res) => {
    try {
        const user_id  = req.params.user_id
        console.log(user_id)
        console.log("userid ni loggin in:", req.user.user_id)
        res.json("you can now update your account")
    } catch (error) {
        console.log(error)
    }
}