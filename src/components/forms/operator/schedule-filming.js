// css
import './filming.css'
import 'react-calendar/dist/Calendar.css';

//

import Calendar from "react-calendar"
import { useEffect, useState } from "react"
import { Link } from 'react-router-dom';
import { Container, Col, Row } from 'react-bootstrap';
import app from '../../../firebaseApp';
import { getDatabase, ref, onValue } from "firebase/database";

// components

import MySelect from '../../UI/MySelect';
import CardFilming from './card-filming';
import MyButton from '../../UI/MyButton';
import ListFilming from './list-filming';
import ListFilmingDate from './list-filming-date';

// server

import oepratorList from '../../../server/operatorList';


const ScheludeFilming = () => {

  const [calendarDate, setCalendarDate] = useState(new Date())
  const [month, setMonth] = useState()

  const [triggerDate, setTriggerDate] = useState(false)


  const [cardList, setCardList] = useState([])
  const [user, setUser] = useState('не определен')


  const getCard = () => {

    const db = getDatabase()
    const cardList = ref(db, 'cardsFilming/')
    onValue(cardList, (data) => {
      setCardList(Object.values(data.val()))
    })

  }

  useEffect(() => {
      getCard()
  }, [])




// filter





//

const onClickMonth = (value, event) => {
  setMonth(value)
  setTriggerDate(true)

}


const onClickDay = (date) => {
  setCalendarDate(date)
  setTriggerDate(false)
}

console.log(calendarDate)


const weekArr = cardList.filter((item) => {return new Date(item.date).getMonth() === new Date(month).getMonth()})
const searchMonthCard = weekArr.filter((item) => (user === 'не определен' || user.label === 'не определен') ?  cardList : item.user.includes(user.label))

console.log(searchMonthCard)


const filterDayCard = cardList.filter((item) => {return item.date.includes(calendarDate.toDateString())})
const searchFilterCard = filterDayCard.filter((item) => (user === 'не определен' || user.label === 'не определен') ?  cardList : item.user.includes(user.label))

const filterDate = () => {


    if (triggerDate === true) {

      return searchMonthCard.map((item,index) => {return <Link key={item.id} to={`/main/operator/schedule/${item.id}`}><ListFilming style={{background: item.userColor}} title={`${item.title}`} date={`${item.date}`} time={`${item.timeStart} - ${item.timeEnd}`} name={`${item.user}`} id={index+1}></ListFilming></Link>})


    } else {

      return searchFilterCard.map((item,index) => {return <Link key={item.id} to={`/main/operator/schedule/${item.id}`}><ListFilming style={{background: item.userColor}} title={`${item.title}`} date={`${item.date}`} time={`${item.timeStart} - ${item.timeEnd}`} name={`${item.user}`} id={index+1}></ListFilming></Link>})

    }





}




  return(
    <>

    <div className="schelude-container">

      <Row className='d-flex'>
        <Col md={6}>
            <Calendar className={'shelude-calendar'} defaultActiveStartDate={new Date()} onClickMonth={onClickMonth}  onChange={onClickDay} value={calendarDate}></Calendar>
            <MySelect styles={{control: (baseStyles, state) => ({...baseStyles, width: 310 + 'px', height: 61 + 'px' , marginTop: 20 + 'px'})}} options={oepratorList} value={user} onChange={setUser}></MySelect>
        </Col>

        <Col md={6}>

            <div className='schelude-info'>

              <div className="shelude-title">Выберите месяц</div>
              <div className='shelude-subtittle'>это необходимо для получения списка всех съёмок за выбранный период</div>

            </div>


        <Row>
          <Col className='mt-4'><Link to={'/main/operator/create'}><MyButton>запланировать съёмку</MyButton></Link></Col>
        </Row>


        </Col>
      </Row>



    </div>


    <Row>
      <Col className='d-flex flex-column  justify-content-center' md={12}>


        {(triggerDate === true) ? <ListFilmingDate date={`${calendarDate.getUTCMonth()} месяц`}></ListFilmingDate> : <ListFilmingDate date={calendarDate.toDateString()}></ListFilmingDate>}


          <ul className='card-list'>

            {(cardList.length < 1) ? <div className='empty-card-list'>Список пуст</div> : filterDate()}

          </ul>

      </Col>
    </Row>



    <Link to={'/main/operator'}><MyButton>Назад</MyButton></Link>



    </>
  )
}

export default ScheludeFilming