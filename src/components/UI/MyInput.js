import './MyInput.css'

import { Container, Col, Row } from 'react-bootstrap'


//
const MyInput = (props) => {


  return(
    <Container>
      <Col xs={12}>

        <Row>

        <div className="form-question-box">
          <input className='form-input' name="input" id="input" value={props.insertText} {...props}/>
        </div>

        </Row>

      </Col>
    </Container>

  )
}


export default MyInput