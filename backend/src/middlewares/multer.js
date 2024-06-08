const multer = require("multer")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, process.env.TEMP_DIR)
    },
    filename: (req, file, cb) => {
        const fileNameOrigim = file.originalname.split(".")
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + '.' + fileNameOrigim[1]
        cb(null, file.fieldname + uniqueSuffix)
    }
})

module.exports = storage