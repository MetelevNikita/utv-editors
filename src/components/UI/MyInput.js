import './MyInput.css'



//
const MyInput = (props) => {


  return(

        <div className="form-question-box">
          <input defaultValue className='form-input' name="input" id="input" value={props.insertText} {...props}/>
        </div>

  )
}


export default MyInput