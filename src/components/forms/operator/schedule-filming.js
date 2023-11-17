// css
import './filming.css'
import 'react-calendar/dist/Calendar.css';

//


import Calendar from "react-calendar"
import { useEffect, useState } from "react"
import { Link } from 'react-router-dom';
import { Container, Col, Row } from 'react-bootstrap';

// components

import MySelect from '../../UI/MySelect';
import CardFilming from './card-filming';
import MyButton from '../../UI/MyButton';

// server

import oepratorList from '../../../server/operatorList';


const ScheludeFilming = () => {

  const [calendarDate, setCalendarDate] = useState(new Date())
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


 const onClickMonth = (value, e) => {
  (value === undefined) ? <div className='empty-card-list'>Список пуст</div> : newArr.filter((item) => {

    console.log(value.getMonth())
    console.log(new Date(item.date).getMonth())


    console.log(newArr)

  })

 }







  return(
    <>

    <div className="schelude-container">

      <Calendar onClickMonth={onClickMonth}  onChange={(date) => {setCalendarDate(date)}} value={calendarDate}></Calendar>
      <MySelect styles={{control: (baseStyles, state) => ({...baseStyles, width: 350 + 'px', height: 61 + 'px' , marginTop: 20 + 'px'})}} options={oepratorList} value={user} onChange={setUser}></MySelect>

    </div>


    <Row>
      <Col className='d-flex justify-content-center'>
      <ul className='card-list'>



            {(cardList.length < 1) ? <div className='empty-card-list'>Список пуст</div> : searchFilterCard.map((item) => {
              return <CardFilming date={`Дата: ${item.date.toString()}`} author={`Автор: ${item.name}`} title={`Название ${item.title}`} place={`Место съёмки: ${item.place}`} conditions={`Описание ${item.conditions}`} time={`Время: ${item.timeStart} - ${item.timeEnd}`} user={`Исполнитель: ${item.user}`}></CardFilming>
            })}
      </ul>
      </Col>
    </Row>



    <Link to={'/operator'}><MyButton>Назад</MyButton></Link>



    </>
  )
}

export default ScheludeFilming