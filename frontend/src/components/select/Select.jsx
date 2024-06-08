import { useAppContext } from '../../hooks/useAppContext'
import './style.css'

// eslint-disable-next-line react/prop-types
const Select = ({children, value, change}) => {
  const {darkMode} = useAppContext()
  return (
    <select className={darkMode ? "selection dark":"selection"} value={value} onChange={(e) => change(e.target.value)}>
        {children}
    </select>
  )
}

export default Select