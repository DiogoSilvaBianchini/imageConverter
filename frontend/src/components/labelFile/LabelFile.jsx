import './style.css'
import ImageIcon from '@mui/icons-material/Image';
import { useAppContext } from '../../hooks/useAppContext';
import { useState } from 'react';

// eslint-disable-next-line react/prop-types
const LabelFile = ({action}) => {
    const {darkMode} = useAppContext()
    const [dragStatus, setDragStatus] = useState(false)
    
    const getImages = (e) => {
        e.preventDefault()
        action(e.dataTransfer.files) 
        setDragStatus(false)
    }

    const getImagesManual = (e) => {
        e.preventDefault()
        action(e.target.files) 
        setDragStatus(false)
    }

    const outDrop = (e) => {
        e.preventDefault()
        setDragStatus(false)
    }

    const enterDropArea = (e) => {
        e.preventDefault()
        setDragStatus(true)
    }

    return (
        <div htmlFor="img"  
            className={dragStatus ? darkMode ? "imgContainer dark dragOn": "imgContainer dragOn": darkMode ? "imgContainer dark" : "imgContainer"} 
            onDragOver={(e) => enterDropArea(e)}   
        >
            <ImageIcon />
            <span>
                Clique ou arraste imagens aqui
            </span>
            <label className='boxDrop' htmlFor="img" onDragLeave={(e) => outDrop(e)} onDrop={(e) => getImages(e)}>.</label>
            <input type="file" hidden id='img' multiple onChange={(e) => getImagesManual(e)}/>
        </div>
    )
}

export default LabelFile