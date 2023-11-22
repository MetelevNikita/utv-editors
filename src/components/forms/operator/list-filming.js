import './filming.css'

//

import { Container, Col, Row } from 'react-bootstrap'
import { useEffect, useState } from 'react'

//


const ListFilming = (props) => {

  const [cardList, setCardList] = useState([])
  const [loading, setLoading] = useState(true)



  return(

      <Row className='d-flex justify-content-center'>
          <div className="list-filming-bottom">
            <div className="list-filming-row">

              <Col md={2} className='d-flex justify-content-center'><div className="filming-date">{props.date}</div></Col>
              <Col md={1} className='d-flex justify-content-center'><div className="filming-color" {...props}></div></Col>
              <Col md={2} className='d-flex justify-content-center'><div className="filming-time">{props.time}</div></Col>
              <Col md={4} className='d-flex justify-content-center'><div className="filming-title">{props.title}</div></Col>
              <Col md={3} className='d-flex justify-content-center'><div className="filming-name">{props.name}</div></Col>

            </div>
          </div>

          <hr />
      </Row>




  )
}

export default ListFilming