import './MyDate.css'
import { Container, Col, Row } from 'react-bootstrap'

const MyDate = (props) => {


  return(
    <Container>
      <Col>
        <Row>

        <div className="form-date-box">
          <input defaultValue className='form-date' type="date" name="date" id="date" value={props.insertDate} {...props}/>
        </div>

        </Row>
      </Col>
    </Container>

  )
}


export default MyDate