import { connectDatabase } from "../pool.js"
import bcrypt  from  "bcryptjs"
const  pool = connectDatabase()


//account
export const ViewAccount = async (req, res) => {
    try{ 
        // const username = req.params.username
        const username = req.user.username
        console.log(username)
        const user = await pool.query("SELECT * FROM public.user_info WHERE username = $1", [username]) 
        console.log(user.rows[0])

        // const {password, user_id, ...other} = user.rows
       
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

        const {
            firstname,
            lastname,
            username,
            email,
            password
        } = req.body

        const user_id  = req.params.user_id
        console.log("usernameinput:", username)
        console.log("user_id", user_id)
        console.log("userid ni loggin in:", req.user.user_id)

        
        if (user_id != req.user.user_id) {
            res.status(401).send("You are not to make changes to this account")
        }
        else{
    
        const userName = await pool.query(`SELECT * FROM public.user_info WHERE username = $1`, [username])
        console.log("username:", req.user.username)
        if (userName.rows.length > 0 && username != req.user.username ) {
            res.status(401).send("Username is already taken")
        }
        const userEmail = await pool.query(`SELECT * FROM public.user_info WHERE email = $1`, [email])
        if (userEmail.rows.length > 0 && email != req.user.email) {
            res.status(401).send("Email already exist!")
        }

        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);

        const bcryptPassword = await bcrypt.hash(password, salt)

        const updatedUser = await pool.query("UPDATE public.user_info SET firstname = $1, lastname = $2, username = $3, email = $4, password = $5 WHERE user_id = $6", [firstname, lastname, username, email, bcryptPassword, user_id]) 


          res.status(200).json("Update Success");
    }
    } catch (error) {
        console.log(error)
    }
}

export const deleteUser = async (req, res) => {
    try {

        const user_id  = req.params.user_id

        if (user_id != req.user.user_id) {
            res.status(401).send("You are not allowed to delete this account")
        }
        else {
        const user = await pool.query(`DELETE FROM user_info WHERE user_id= $1`, [user_id])
        res.status(200).json("User deleted")
        }
    } catch (error) {
        console.log(error)
        
    }
}

