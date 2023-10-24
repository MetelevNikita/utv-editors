//

import './MyInput.css'

const MyInput = ({inputName, ...props}) => {

const {name, setName} = inputName


  return(
    <div className="form-question-box">
      <div className='form-text'>{props.title}</div>
      <input className='form-input' type="text" name="input" id="input" value={name} onChange={(e) => {setName(e.target.value)}}/>
    </div>
  )
}


export default MyInput