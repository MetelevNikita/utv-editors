//
const MyInput = (props) => {


  return(
    <div className="form-question-box">
      <div className='form-text'>{props.title}</div>
      <input className='form-input' type="text" name="input" id="input" value={props.insertText} {...props}/>
    </div>
  )
}


export default MyInput