import { useState } from "react"


export const useFetch = () => {
    const [data, setData] = useState(null)
    const [load, setLoad] = useState(false)
    const [error, setError] = useState(null)

    const createBody = (payload) => {
        const newBody = new FormData
        for(let file of payload){
            newBody.append(file.name, file.value)
        }
        return newBody
    }

    const httpRequest = async (url, method, payload) => {
        const body = createBody(payload)

        setLoad(true)
        const req = await fetch(`${import.meta.env.VITE_URL_API}/${url}`, {
            method,
            body
        })
        const res = await req.json()
        
        if(res.status == 200 || res.status == 201){
            setData(res)
        }else{
            setError(res)
        }

        setLoad(false)
    }

    return {data, error, load, httpRequest}
}