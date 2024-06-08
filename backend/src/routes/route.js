const express = require("express")
const multer = require("multer")

const fs = require("fs")

const cors = require("cors")
const morgan = require("morgan")

const storageConfig = require("../middlewares/multer")
const { exportBase64, removeImage, saveBuffer } = require("../controllers/upload")
const memoryStorage = multer.memoryStorage()

// const uplaodTemp = multer({storage: storageConfig})
const uplaodMemory = multer({storage: memoryStorage})

const router = express.Router()
router.use(morgan("dev"))

router.use(cors({
    origin: "http://localhost:5173"
}))

router.get("/", (req,res) => res.status(200).json({results: "Hello World", status: 200}))

router.post ("/exportBase64", express.json(), exportBase64)
router.post("/upload", uplaodMemory.array("imgs"), saveBuffer)

module.exports = router