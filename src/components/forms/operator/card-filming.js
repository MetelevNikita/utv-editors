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

// server

import operatorlist from './../../../server/operatorList'



const CardFilming = ({authEmailLog , ...props}) => {

  // 

  const TOKEN = process.env.REACT_APP_TG_TOKEN

  // 

  const [cardList, setCardList] = useState([])
  const [loading, setLoading] = useState(true)


  const authEmail = sessionStorage.getItem('email')



  const navigate = useNavigate()
  const params = useParams()
  const id = params.id




  const messageDel = (title, date, timeStart, timeEnd) => {
    return `Съёмка - ${title}\n\nДата - ${date}\n\nВРЕМЯ - ${timeStart} : ${timeEnd}\n\nОТМЕНЕНА!!!!! `
  }





  const getCard = () => {
      const db = getDatabase()
      const cardList = ref(db, 'cardsFilming/')
      onValue(cardList, (data) => {
        setCardList(Object.values(data.val()))
        setLoading(false)
      })
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


  console.log(messageDel(singleArr[0].title, singleArr[0].date, singleArr[0].timeStart, singleArr[0].timeEnd))




  const delCard = async () => {

    try {

      const URL_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`


      const users = singleArr[0].user.split(',')
      const currentUsers = operatorlist.filter((item) => {
      const res = users.includes(item.label)
        return res
      })


      currentUsers.forEach(async (item) => {
        const responce = await fetch(URL_API, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            chat_id: item.value,
            text: messageDel(singleArr[0].title, singleArr[0].date, singleArr[0].timeStart, singleArr[0].timeEnd),
          })
        })

        if (!responce.ok) {
          alert(`Ошибка отправки сообщения об удалении карточки - ${responce.status}`)
          throw new Error(`Ошибка отправки сообщения об удалении карточки - ${responce.status}`)
        }

        const data = await responce.json()
        console.log(data)

      })

      const db = getDatabase()
      remove(ref(db, `cardsFilming/${singleArr[0].id}`))
      navigate('/main/operator/schedule')
      
    } catch (error) {

      console.log(`Ошибка удаления задачи (съемки) ${error.message}`)
      return `Ошибка удаления задачи (съемки) ${error.message}`
      
    }

}











  if(loading === true) {
    <>LOADING</>
  }


  return(
    <>
    <li className="card-filming-container">

      <div className="card-filming-date_box">


        <div className='card-filming-date-box'>

          {/* <div className="card-filming-date_current">{(typeof singleArr[0].date !== 'string') ? singleArr[0].date.date : singleArr[0].date}</div> */}


          {(typeof singleArr[0].date !== 'string' && !Array.isArray(singleArr[0].date)) && <div className="card-filming-date_current">{singleArr[0].date.date}</div>}

          {(typeof singleArr[0].date === 'string' && Array.isArray(singleArr[0].date) === false) && <div className="card-filming-date_current">{singleArr[0].date}</div>}

          {(Array.isArray(singleArr[0].date)) && <div className="card-filming-date_current">{new Date(singleArr[0].date).toDateString()}</div>}


          {(singleArr[0].createAt) ? <div className="card-filming-date_create">{`Дата создания: ${singleArr[0].createAt}`}</div> : ''}

        </div>

      </div>

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

          {(singleArr[0].soundEngineer) ? <div className="card-filming-user">Звукорежиссер Владимир Симановский</div> : <></>}
          {(singleArr[0].soundEngineer) ? <div className="card-filming-user">Отмечено участие технического отдела</div> : <></>}
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