// css

import 'react-calendar/dist/Calendar.css';

//


import { Container, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';


// server

import oepratorList from '../../server/operatorList';


// components

import MyButton from '../UI/MyButton';


const FormOperator = () => {

  return(

    <div className="operator-container">


      <Row className='mt-5'>
        <Col md={6} sm={12} xs={12}>

          <Link to={'create'}><MyButton>создать съёмку</MyButton></Link>

        </Col>

        <Col md={6} sm={12} xs={12}>

          <Link to={'schedule'}><MyButton>посмотреть съёмки</MyButton></Link>

        </Col>
      </Row>







    </div>

  )
}

export default FormOperator