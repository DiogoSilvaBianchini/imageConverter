import { useContext } from 'react'
import {AppContext} from '../context/appContext'

export const useAppContext = () => {
  const context = useContext(AppContext)
  
  if(!context){
    throw new Error("Contexto inesistente")
  }

  return context
}