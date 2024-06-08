const fs = require("fs")
const path = require("path")
const sharp = require("sharp")

const saveBuffer = async (req, res, next) => {
    if(!req.files) return res.status(401).json({message: "Nenhuma imagem recebida.", status: 401})
    const results = []

    for(let file of req.files){
        results.push({cryptoImg: file.buffer.toString("base64"), mimeType: file.mimetype, id: Math.floor(Math.random() * 1E9)})
    }

    return res.status(200).json({results, status: 200})
}

const exportBase64 = async (req, res, next) => {
    const {listFile, type} = req.body
    const results = []
    
    try {
        
        for(let file of listFile){
            const convetBuffer = Buffer.from(file, "base64")
            let bufferImage = await sharp(convetBuffer).toFormat(type).toBuffer()
            results.push({bufferImage})
        }
        
        res.status(200).json({results, status: 200})
    } catch (error) {
        next(error)
    }
}

const removeImage = async (req, res, next) => {
    try {
        const {listNames} = req.body
        const dir = path.resolve(__dirname, "../../../", "imgTemp")
        
        for(let fileName of listNames){
            await fs.unlinkSync(`${dir}/${fileName}`)
        }

        return res.status(201).json({results: "Arquivo removido com sucesso", status: 201})
    } catch (error) {
        console.log(error)
        return res.status(500).json({results: "Erro interno do servidor", status: 500})
    }
}


module.exports = {
    saveBuffer,
    exportBase64,
    removeImage
}