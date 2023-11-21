//

import './MyButtonBack.css'


const MyButtonBack = ({children, ...props}) => {

  return(
    <button className="my-button-back" {...props}>{children}</button>
  )
}

export default MyButtonBack