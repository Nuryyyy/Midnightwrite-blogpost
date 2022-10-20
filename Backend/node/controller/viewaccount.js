import { connectDatabase } from "../pool.js"
const  pool = connectDatabase()


//account
export const ViewAccount = async (req, res) => {
    try{ 
        const username = req.params.username
        const user = await pool.query(`SELECT * FROM public.user_info WHERE username = $1`, [username]) 
        console.log(user.rows)
    // const user = await pool.query(`SELECT * FROM public.user_info WHERE username = $1`, [username])
        res.send(`
        Details:
            Username:  ${user.rows[0].username}
            Firstname: ${user.rows[0].firstname}  
            Lastname:  ${user.rows[0].lastname}
            Email:  ${user.rows[0].email}
            `)
       
       
    }  catch (error) {
        console.error(error.message);
    }

}