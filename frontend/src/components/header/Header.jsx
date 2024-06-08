import {useAppContext} from '../../hooks/useAppContext'
import CircleButton from '../circleButton/circleButton'

import LightModeIcon from '@mui/icons-material/LightMode';
import NightlightRoundIcon from '@mui/icons-material/NightlightRound';


const Header = () => {
    const {darkMode, setDarkMode} = useAppContext()

    const colorMode = () => {
        setDarkMode(!darkMode)
    }

    return (
        <header>
            <CircleButton darkMode={darkMode} action={colorMode}>
                {darkMode ? <NightlightRoundIcon /> : <LightModeIcon /> }
            </CircleButton>
        </header>
    )
}

export default Header