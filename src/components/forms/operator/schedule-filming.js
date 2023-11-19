// css
import './filming.css'
import 'react-calendar/dist/Calendar.css';

// img

import crossOpen from './../../../asset/cross-open.svg'


import Calendar from "react-calendar"
import { useEffect, useState } from "react"
import { Link } from 'react-router-dom';
import { Container, Col, Row } from 'react-bootstrap';

// components

import MySelect from '../../UI/MySelect';
import CardFilming from './card-filming';
import MyButton from '../../UI/MyButton';
import ListFilming from './list-filming';

// server

import oepratorList from '../../../server/operatorList';


const ScheludeFilming = () => {

  const [calendarDate, setCalendarDate] = useState(new Date())
  const [montHDate, setMontHDate] = useState()
  const [cardList, setCardList] = useState([])
  const [user, setUser] = useState('не определен')




  const getCardList = () => {

    const URL_FIREBASE = 'https://utv-edit-list-default-rtdb.firebaseio.com/card.json'

    return fetch(URL_FIREBASE, {
      method: 'GET',
      headers: {
        'Content-Type': 'apllication/json'
      }
    }).then(responce => responce.json())
      .then(data => {
        if(data === null) {
          return []
        } else {
          setCardList(Object.values(data))
        }
      })
  }


  useEffect(() => {
      getCardList()
  }, [])




// filter


const newArr = []

const ArrayNameCard = () => {cardList.map((card) => {
    return newArr.push(card.cardFilming)
  })}

ArrayNameCard()

const filterDateCard = newArr.filter((item) => {return item.date.includes(calendarDate.toDateString())})
const searchFilterCard = filterDateCard.filter((item) => (user === 'не определен' || user.label === 'не определен') ?  cardList : item.user.includes(user.label))


//

let weekArr = []

   const onClickMonth = (value, event) => {

    console.log()

    weekArr = newArr.filter((item) => {
      return new Date(item.date).getMonth() === new Date(value).getMonth()
    })

    console.log(weekArr)
  }












  return(
    <>

    <div className="schelude-container">

      <Row className='d-flex'>
        <Col md={6}>
            <Calendar className={'shelude-calendar'} onClickMonth={onClickMonth}  onChange={(date) => {setCalendarDate(date)}} value={calendarDate}></Calendar>
            <MySelect styles={{control: (baseStyles, state) => ({...baseStyles, width: 310 + 'px', height: 61 + 'px' , marginTop: 20 + 'px'})}} options={oepratorList} value={user} onChange={setUser}></MySelect>
        </Col>

        <Col md={6}>

            <div className='schelude-info'>

              <div className="shelude-title"></div>
              <div className='shelude-subtittle'></div>

            </div>

            <Row className='d-flex justify-content-center align-items-center  mt-4'>


            <Col md={6}>
            <MyButton>Неделя</MyButton>
            </Col>

            <Col md={6}>
            <MyButton>Месяц</MyButton>
            </Col>

            </Row>
        </Col>
      </Row>



    </div>


    <Row>
      <Col className='d-flex justify-content-center'>
      <ul className='card-list'>

      <div className="list-filming-container">

        <div className="list-filming-top">
          <div className="list-filming-title">Пятница - 17 ноября 2023 </div>
          <button className='list-filming-btn'><img src={crossOpen} alt="cross-open" /></button>

        </div>


            {(cardList.length < 1) ? <div className='empty-card-list'>Список пуст</div> : searchFilterCard.map((item) => {return <ListFilming style={{background: item.userColor}} title={`${item.title}`} time={`${item.timeStart} - ${item.timeEnd}`} name={`${item.user}`}></ListFilming>})}

          </div>
      </ul>
      </Col>
    </Row>



    <Link to={'main/operator'}><MyButton>Назад</MyButton></Link>



    </>
  )
}

export default ScheludeFilming