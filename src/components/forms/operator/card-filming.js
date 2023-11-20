// css

import './filming.css'

//

import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'


// components

import MyButton from '../../UI/MyButton'



const CardFilming = (props) => {


  const [cardList, setCardList] = useState([])
  const [loading, setLoading] = useState(true)

  const params = useParams()
  const id = params.id



  const getCard = () => {

    const URL_FIREBASE = 'https://utv-edit-list-default-rtdb.firebaseio.com/card.json'

    fetch(URL_FIREBASE, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(responce => responce.json())
      .then(data => {
        setCardList(Object.values(data))
        setLoading(false)
      })
      .catch((error) => {console.log(error, 'ERROR')})
  }

  useEffect(() => {
    getCard()
  }, [])


  if(loading) {
    return <h1 className='card-filming-loading'>LOADING</h1>
  }

  const newArr = cardList.map((card) => {return card.cardFilming})
  const singleArr = newArr.filter((item) => {
    return item.id === id
  })


  console.log(singleArr)




  return(
    <>
    <li className="card-filming-container">
      <div className="card-filming-date">{singleArr[0].date}</div>
        <div className="card-filming-box">

          <div className="card-filming-title">{singleArr[0].title}</div>
          <div className="card-filming-author">{singleArr[0].author}</div>
          <div className="card-filming-place">{singleArr[0].place}</div>
          <div className="card-filming-conditions">{singleArr[0].conditions}</div>
          <div className='card-filming-time'>{singleArr[0].time}</div>

          <hr></hr>

          <div className="card-filming-user">{singleArr[0].user}</div>
        </div>
    </li>

      <Row className='mt-4'>
        <Col>
            <Link to={'/main/operator/schedule'}><MyButton>Назад</MyButton></Link>
        </Col>
      </Row>
    </>



  )
}

export default CardFilming