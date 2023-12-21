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
import MyButtonBack from '../../UI/MyButtonBack'

//



const CardFilming = ({authEmailLog , ...props}) => {


  const {authEmail, setAuthEmail} = authEmailLog

  console.log(authEmail)


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

  console.log(singleArr)



  if(loading === true) {
    <>LOADING</>
  }


  return(
    <>
    <li className="card-filming-container">
      <div className="card-filming-date">{singleArr[0].date}</div>
        <div className="card-filming-box">

          <div className="card-filming-title">{(singleArr[0].title === '') ? singleArr[0].type : singleArr[0].title}</div>
          <div className="card-filming-author">{`Контактное лицо: ${singleArr[0].contacts}`}</div>
          <div className="card-filming-place">{singleArr[0].place}</div>
          <div className="card-filming-conditions">{singleArr[0].conditions}</div>
          <div className='card-filming-time'>{(singleArr[0].title === '') ? `Время: ${singleArr[0].type}` : `Время:  ${singleArr[0].timeStart} - ${singleArr[0].timeEnd}`}</div>
          <div className='card-filming-cloth'>{`Форма одежды: ${singleArr[0].cloth}`}</div>
          <div className='card-filming-project'>{`Проект: ${singleArr[0].projectPay}`}</div>

          <hr></hr>

          <div className="card-filming-user">{`Оператор: ${singleArr[0].user}`}</div>
        </div>
    </li>

      <Row className='mt-4'>
        <Col>
            <Link to={`/main/schedule/edit/${id}`}><MyButton onClick={() => {console.log('редактируй')}}>Редактировать</MyButton></Link>
        </Col>

        {(authEmail === 'admin@gmail.com') ? <Col><MyButton onClick={() => {delCard()}}>Удалить</MyButton></Col> : <></> }


      </Row>

      <Row className='mt-4'>
        <Col>

            <Link to={'/main/schedule'}><MyButtonBack>Назад</MyButtonBack></Link>
        </Col>
      </Row>
    </>



  )
}

export default CardFilming