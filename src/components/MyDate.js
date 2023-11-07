import './MyDate.css'
import { Container, Col, Row } from 'react-bootstrap'

const MyDate = (props) => {


  return(
    <Container>
      <Col xl={12} md={12} sm={12} xs={12}>
        <Row>

        <div className="form-date-box">
          <div className='form-text'>{props.date}</div>
          <input className='form-date' type="date" name="date" id="date" value={props.insertDate} {...props}/>
        </div>

        </Row>
      </Col>
    </Container>

  )
}


export default MyDate