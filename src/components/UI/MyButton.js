import './MyButton.css'

const MyButton = ({children, ...props}) => {


  return(
    <button className="btn" {...props}>{children}</button>
  )
}


export default MyButton