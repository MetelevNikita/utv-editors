import './MenuButton.css'


const MenuButon = (props) => {

  return(
    <div className="menu-button-container">
      <div className="menu-button-box">

          <img className="menu-button-img" src={props.menuButtonImg} alt="menu-img" />
          <div className="menu-button-title">{props.menuButtonTitle}</div>

      </div>
    </div>
  )
}

export default MenuButon