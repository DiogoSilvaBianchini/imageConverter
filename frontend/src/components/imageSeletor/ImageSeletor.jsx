import HideImageIcon from '@mui/icons-material/HideImage';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import './style.css'
import { useAppContext } from '../../hooks/useAppContext';
import Selection from '../select/Select'
import { useState } from 'react';
import JSZip from 'jszip'
import {saveAs} from 'file-saver'

// eslint-disable-next-line react/prop-types
const ImageSeletor = ({base64=[], setBase64}) => {
    const {darkMode, setFormState} = useAppContext()
    const [typeFile, setType] = useState("JPEG")

    const deleteHover = (id) => {
        document.querySelector(`#card${id}`).classList.remove("none")
    }

    const removeHover = (id) => {
        document.querySelector(`#card${id}`).classList.add("none")
    }
   

    const deleteImage = async (id) => {
        const filter = base64.filter(element => element.id !== id)
        setBase64(filter)        
        
        if(filter.length === 0){
            setFormState(0)
        }
    }

    const convertImages = async () => {
        let base64List = []
        
        for(let file of base64){
            const req = await fetch(`${import.meta.env.VITE_URL_API}/exportBase64`, {
                headers: {"Content-type":"application/json"},
                method: "POST",
                body: JSON.stringify({listFile: [file.base64], type: typeFile})
            })
    
            const res = await req.json()
            base64List.push(res.results[0])
        }
        
        return base64List.map(file => ({
            buffer: Uint8Array.from(file.bufferImage.data)
        }))
        
    }

    const saveImages = async () => {       
        const zip = new JSZip()
        
        const res = await convertImages()

        if(res.length > 1){
            for(let file of res){
                const blob = new Blob([file.buffer], {type: typeFile})
                zip.file("convertion"+ Math.floor(Math.random() * 1E9) + "." + typeFile, blob)
            }
            const zipBlob = await zip.generateAsync({type: 'blob'})
            saveAs(zipBlob, `imgConvert-${Math.floor(Math.random() * 1E9)}.zip`)  
        }else{
            const blob = new Blob([res[0].buffer], {type: typeFile})
            saveAs(blob, `imgConvert-${Math.floor(Math.random() * 1E9)}.${typeFile}`)  
        }
  
        setBase64([])
        setFormState(0)
    }

  return (
    <div className={darkMode ? "containerImage dark":"containerImage"}>
        <ul className={darkMode ? "imagesContainer dark":"imagesContainer"}>
            {
                base64 && base64.length > 0 ? base64.map((element) => (
                    <li key={element.id} onMouseLeave={() => removeHover(element.id)} onMouseEnter={() => deleteHover(element.id)} onClick={() => deleteImage(element.id, element.imgName)}>
                        <div className='removeItem none' id={`card${element.id}`}>
                            <DeleteForeverIcon />
                        </div>
                        <img src={element.url} alt="" />
                    </li>
                )): 
                <li className='empty'>
                    <HideImageIcon />
                    <span>Nenhuma imagem</span>
                </li>
            }
        </ul>
        <div className={darkMode ? "options dark":"options"}>
            <h2>Configurações</h2>
            <label htmlFor="">
                <span>Converter para: </span>
                <Selection change={setType} value={typeFile}>
                    <option value="jpeg">JPEG</option>
                    <option value="jpg">JPG</option>
                    <option value="png">PNG</option>
                    <option value="webp">WEBP</option>
                </Selection>
            </label>
            <button onClick={saveImages} className={darkMode ? "activeBtn dark":"activeBtn"}>Converter</button>
        </div>
    </div>
  )
}

export default ImageSeletor