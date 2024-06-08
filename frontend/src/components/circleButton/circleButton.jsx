import "./style.css"

// eslint-disable-next-line react/prop-types
const CircleButton = ({children, darkMode, action}) => {
  return (
    <button className={darkMode ? "circleBtn dark":"circleBtn"} onClick={action}>
          {children}
    </button>
  )
}

export default CircleButton