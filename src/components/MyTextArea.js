import './MyTextArea.css'

const MyTextArea = (props) => {


  return(
    <div className="form-area-box">
    <textarea className='form-area-input' value={props.insertArea} {...props}></textarea>
  </div>
  )
}

export default MyTextArea