// css
import './filming.css'
import 'react-calendar/dist/Calendar.css';

//


import Calendar from "react-calendar"
import { useEffect, useState } from "react"

// components

import MySelect from '../../UI/MySelect';
import CardFilming from './card-filming';

// server

import oepratorList from '../../../server/operatorList';


const ScheludeFilming = () => {

  const [calendarDate, setCalendarDate] = useState(new Date())
  const [cardList, setCardList] = useState([])
  const [user, setUser] = useState('не определен')

  console.log(calendarDate.toDateString())










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


const filterNameCard = newArr.filter((item) => (user === 'не определен' || user.label === 'не определен') ?  cardList : item.user.includes(user.label))

console.log(filterNameCard)


const filterDateCard = newArr.filter((item) => {return item.date.includes(calendarDate.toDateString())})

console.log(filterDateCard)








  return(
    <>

    <div className="schelude-container">

      <Calendar onChange={(date) => {setCalendarDate(date)}} value={calendarDate}></Calendar>
      <MySelect styles={{control: (baseStyles, state) => ({...baseStyles, width: 350 + 'px', height: 61 + 'px' , marginTop: 20 + 'px'})}} options={oepratorList} value={user} onChange={setUser}></MySelect>

    </div>



    <ul className='card-list'>

        {(cardList.length < 1) ? <div className='empty-card-list'>Список пуст</div> : filterNameCard && filterDateCard.map((item) => {
          return <CardFilming date={`Дата: ${item.date.toString()}`} author={`Автор: ${item.fio}`} title={`Название ${item.title}`} place={`Место съёмки: ${item.place}`} conditions={`Описание ${item.conditions}`} time={`Время: ${item.timeStart} - ${item.timeEnd}`} user={`Исполнитель: ${item.user}`}></CardFilming>
        })}


    </ul>



    </>
  )
}

export default ScheludeFilming