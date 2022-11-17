import multer from "multer"; //for photo file

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../upload')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
  })

const upload = multer({ storage: storage,  limits: {fileSize: 1024 * 1024 * 3
} })


export default upload
