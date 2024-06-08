import './App.css'
import { useEffect, useState } from 'react';
import { useAppContext } from './hooks/useAppContext';

import Header from './components/header/Header';
import FormSelectImage from './components/formSelectImage/FormSelectImage';
import ImageSeletor from './components/imageSeletor/ImageSeletor';
import { base64ToBlob } from './utils/base64ForBlob';

function App() {
  const {darkMode, formState} = useAppContext()
  const [listImageBase64, setListImageBase64] = useState(null)
  const [data, setData] = useState(null)

  useEffect(() => {
    console.log(listImageBase64)
  }, [listImageBase64])

  useEffect(() => {
    if(listImageBase64){
      const urlImage = []

      for(let file of listImageBase64){
          const blob = base64ToBlob({base64: file.cryptoImg, type: file.mimeType})
          const url = URL.createObjectURL(blob)
          urlImage.push({base64: file.cryptoImg, id: file.id, url })
      }         
      
      setData(urlImage)
    }
  },[listImageBase64])


  return (
    <div className={darkMode ? "app darkBackground": "app"}>
        <Header />
        {
          formState === 0 ? <FormSelectImage darkMode={darkMode} setBase64={setListImageBase64}/>:
          formState === 1 && <ImageSeletor base64={data} setBase64={setData}/>
        }
    </div>
  )
}

export default App
