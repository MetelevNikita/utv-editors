import './MyTextArea.css'

import { Container, Col, Row } from 'react-bootstrap'

const MyTextArea = (props) => {


  return(

    <Container>
      <Col xs={12}>

        <Row>

        <div className="form-area-box">
          <textarea className='form-area-input' value={props.insertArea} {...props}></textarea>
        </div>

        </Row>

      </Col>
    </Container>
  )
}

export default MyTextArea