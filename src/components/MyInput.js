import './MyInput.css'

import { Container, Col, Row } from 'react-bootstrap'


//
const MyInput = (props) => {


  return(


        <div className="form-question-box">
          <input className='form-input' type="text" name="input" id="input" value={props.insertText} {...props}/>
        </div>

  )
}


export default MyInput