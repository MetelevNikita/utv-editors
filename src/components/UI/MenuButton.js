import './MenuButton.css'


import UiCameraSvg from './menu_image/uiCameraSvg'



const MenuButon = ({children,...props}) => {


  return(

  <button className='menu-button' {...props}>
    {children}
    <div className='menu-title'>{props.title}</div>
    </button>

  )
}

export default MenuButon