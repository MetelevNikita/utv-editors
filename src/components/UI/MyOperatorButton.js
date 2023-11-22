import './MyOperatorButton.css'


const MyOperatorButton = ({children, ...props}) => {
  return(
    <button className="my-operator-button" {...props}>{children}</button>
  )
}


export default MyOperatorButton