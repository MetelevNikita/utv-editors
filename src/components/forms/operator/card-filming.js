// css

import './filming.css'

//

import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { getDatabase, ref, onValue, remove } from "firebase/database";
import { useNavigate } from 'react-router-dom'


// components

import MyButton from '../../UI/MyButton'



const CardFilming = (props) => {


  const [cardList, setCardList] = useState([])
  const [loading, setLoading] = useState(true)


  const navigate = useNavigate()
  const params = useParams()
  const id = params.id


const getCard = () => {
    const db = getDatabase()
    const cardList = ref(db, 'cardsFilming/')
    onValue(cardList, (data) => {
      setCardList(Object.values(data.val()))
      setLoading(false)
    })
  }



const delCard = () => {
  const db = getDatabase()
  remove(ref(db, `cardsFilming/${singleArr[0].id}`))
  navigate('/main/operator/schedule')
}




  useEffect(() => {
      getCard()
  }, [])




  if(loading) {
    return <h1 className='card-filming-loading'>LOADING</h1>
  }


  const singleArr = cardList.filter((item) => {
    return item.id === id
  })




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

        <Col>
            <MyButton onClick={() => {delCard()}}>Удалить</MyButton>
        </Col>
      </Row>
    </>



  )
}

export default CardFilming