import './MySelect.css'
import { Container, Col, Row } from 'react-bootstrap'
import Select from 'react-select'




const MySelect = (props) => {


  return(

      <div>
        <div className='form-text'>{props.select}</div>
        <Select defaultValue className='select' {...props}></Select>
      </div>

  )
}


export default MySelect