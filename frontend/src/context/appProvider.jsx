import { useState } from "react"
import {AppContext} from './appContext'


// eslint-disable-next-line react/prop-types
export const AppProvider = ({children}) => {
    const [darkMode, setDarkMode] = useState(false)
    const [formState, setFormState] = useState(0)

    return <AppContext.Provider value={{darkMode, setDarkMode, formState, setFormState}}>
        {children}
    </AppContext.Provider>
}