export const httpRequest = async (url, method, body) => {
    let load = true
    let res = null
    let error = null
    
    const req = await fetch(`${import.meta.env.VITE_URL_API}${url}`, {
        headers: {"Content-type":"application/json"},
        method: method,
        body: JSON.stringify(body)
    })

    const response = await req.json()
    load = false

    if(response.status == 200 || response.status == 201){
        res = response.results
    }else{
        error = response.results
    }
    return {res, error, load}
}