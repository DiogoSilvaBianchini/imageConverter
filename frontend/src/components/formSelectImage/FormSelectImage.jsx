import { useAppContext } from '../../hooks/useAppContext';
import './style.css'
import LabelFile from '../labelFile/LabelFile';
import { useEffect, useState } from 'react';

// eslint-disable-next-line react/prop-types
const FormSelectImage = ({setBase64}) => {
    const {darkMode, setFormState} = useAppContext()
    const [img, setImges] = useState(null)

    useEffect(() => {
        const httpRequest = async () => {
            const body = new FormData()
            
            for(let file of img){
                body.append("imgs",file)
            }

            const req = await fetch(`${import.meta.env.VITE_URL_API}/upload`, {
                method: "POST",
                body
            })

            const res = await req.json()

            setBase64(res.results)
            setFormState(1)
        }

        img && httpRequest()
    }, [img, setBase64, setFormState]) 

    return (
    <div className={darkMode ? "formImageStage dark":"formImageStage"}>
        <h1>Converta uma ou mais imagens</h1>
        <LabelFile action={setImges}/>
    </div>
    )
}

export default FormSelectImage