import multer from "multer"; //for photo file
import path from "path"

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      // cb(null, '../../Frontend/reactjs/public/upload')
    cb(null, '../client/public/upload')
    },
    filename: (req, file, cb)  => {
      console.log(file)
        cb(null, Date.now() + path.extname(file.originalname))
    }
  })

const upload = multer({ storage: storage,  
                        limits: {fileSize: 1024 * 1024 * 3} 
                      })


export default upload