import './MenuButton.css'


import UiCameraSvg from './menu_image/uiCameraSvg'



const MenuButon = ({children,...props}) => {


  return(

  <button {...props}>
    {children}
    </button>

  )
}

export default MenuButon