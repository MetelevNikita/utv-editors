import './MySelect.css'
import { Container, Col, Row } from 'react-bootstrap'
import Select from 'react-select'


const MySelect = (props) => {


  return(
    <Container>
      <Col>
      <Row>

      <div className="form-select-box">
      <div className='form-text'>{props.select}</div>
      <Select defaultInputValue='' className='select' {...props}></Select>
      </div>

      </Row>
      </Col>
    </Container>

  )
}


export default MySelect