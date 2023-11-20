import './filming.css'
import { Container, Col, Row } from 'react-bootstrap'
import { useEffect, useState } from 'react'


// img

import crossOpen from './../../../asset/cross-open.svg'

//


const ListFilming = (props) => {

  const [cardList, setCardList] = useState([])
  const [loading, setLoading] = useState(true)




  return(

      <Row className='d-flex'>

          <div className="list-filming-bottom">

            <div className="list-filming-row">

              <Col md={1}><div className="filming-color" {...props}></div></Col>
              <Col md={3}><div className="filming-time">{props.time}</div></Col>
              <Col md={4}><div className="filming-title">{props.title}</div></Col>
              <Col md={4}><div className="filming-name">{props.name}</div></Col>

            </div>

          </div>

          <hr />

      </Row>




  )
}

export default ListFilming