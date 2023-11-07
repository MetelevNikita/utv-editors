import './MySelect.css'
import { Container, Col, Row } from 'react-bootstrap'



import usersList from '../usersList'
import Select from 'react-select'
import { auto } from '@popperjs/core'

const MySelect = (props) => {


  return(
    <Container>
      <Col sm={12} xs={12} xxs={12}>
      <Row>

      <div className="form-select-box">
      <div className='form-text'>{props.select}</div>
      <Select className='select' options={usersList} styles={{control: (styles) => {return {...styles, width: 300 + 'px', height: 45 + 'px', marginBottom: 1 + 'px',}}}}   {...props}></Select>
      </div>

      </Row>
      </Col>
    </Container>

  )
}

export default MySelect