import './filming.css'

//

import { Container, Col, Row } from 'react-bootstrap'
import { useEffect, useState } from 'react'

//


const ListFilming = (props) => {

  const [cardList, setCardList] = useState([])
  const [loading, setLoading] = useState(true)



  return(


    <>



      <Col xl={12} md={12} sm={12} xs={12} className='d-flex flex-row justify-content-center align-items-center mb-3'>

          <Col md={2} className='d-flex justify-content-center'><div className="filming-date">{props.date}</div></Col>
          <Col md={1} className='d-flex justify-content-center'><div className="filming-color" {...props}></div></Col>
          <Col md={2} className='d-flex justify-content-center'><div className="filming-time">{props.time}</div></Col>
          <Col md={4} className='d-flex justify-content-center'><div className="filming-title">{props.title}</div></Col>
          <Col md={1} className='d-flex justify-content-center'><div className="filming-name">{props.name}</div></Col>

      </Col>

      <hr className='filming-line'/>



    </>








  )
}

export default ListFilming