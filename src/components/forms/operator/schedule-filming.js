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
import MyButtonBack from '../../UI/MyButtonBack';
import MyOperatorButton from '../../UI/MyOperatorButton';
import ListFilming from './list-filming';
import ListFilmingDate from './list-filming-date';

// server

import oepratorList from '../../../server/operatorList';
import operatorProject from '../../../server/operatorProject';


const ScheludeFilming = ({authEmailLog, fixedCalendarDay}) => {


  const {authEmail, setAuthEmail} = authEmailLog
  const {calendarDate, setCalendarDate} = fixedCalendarDay

  console.log(calendarDate)


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



const onClickMonth = (value, event) => {
  setMonth(value)
  setTriggerDate(true)

}

const onClickDay = (date) => {

  setCalendarDate(date)
  setTriggerDate(false)
}



const weekArr = cardList.filter((item) => {return new Date(item.date).getMonth() === new Date(month).getMonth()})
const searchMonthCard = weekArr.filter((item) => (user === 'не определен' || user.label === 'не определен') ?  cardList : item.user.includes(user.label))

const filterDayCard = cardList.filter((item) => {return item.date.includes(calendarDate.toDateString())})
const searchFilterCard = filterDayCard.filter((item) => (user === 'не определен' || user.label === 'не определен') ?  cardList : item.user.includes(user.label))


const sortDay  = searchFilterCard.sort((a, b) => {
  if(a.timeStart < b.timeStart) {
    return -1
  }

  if(a.timeStart > b.timeStart) {
    return 1
  }

  return 0
})


const sortMonthDate = searchMonthCard.sort((a, b) => {
  const dateA = new Date(a.date).getDate()
  const dateB = new Date(b.date).getDate()

  if(dateA < dateB) {
    return -1
  }

  if(dateA > dateB) {
    return 1
  }
  return 0

})


const sortMonthTime = searchMonthCard.sort((a, b) => {

  if(a.timeStart < b.timeStart)  {
    return -1
  }

  if(a.timeStart > b.timeStart) {
    return 1
  }
  return 0
})



const timeData = (label, item) => {

  if(label === 'РЕЗЕРВ 8часовой') {

    return `${8} часов`

  } else if (label === 'РЕЗЕРВ 12часовой') {

    return `${12} часов`

  } else if (label === 'ДЕЖУРНЫЙ') {

    return `${8} часов`

  } else if (label === 'ОТПУСК') {

    return `${8} часов`

  } else if (label === 'ВЫХОДНОЙ') {

    return `${8} часов`

  } else {

    return `${item.timeStart} - ${item.timeEnd}`
  }

}


const filterDate = () => {


    if (triggerDate === true) {

      return sortMonthTime.map((item,index) => {return <Link key={item.id} to={`/main/schedule/${item.id}`}><ListFilming style={{background: item.userColor}} title={(item.title === '') ? `${item.type}` : `${item.title}`} date={`${item.date}`} time={timeData(item.type, item)} name={`${item.user}`} id={index+1}></ListFilming></Link>})

    } else {

      return sortDay.map((item,index) => {return <Link key={item.id} to={`/main/schedule/${item.id}`}><ListFilming style={{background: item.userColor}} title={(item.title === '') ? `${item.type}` : `${item.title}`} date={`${item.date}`}  time={timeData(item.type, item)} name={`${item.user}`} id={index+1}></ListFilming></Link>})
    }
}


//


  return(
    <>

    <div className="schelude-container">

      <Row className='d-flex'>
        <Col md={6} className='d-flex flex-column justify-content-center align-items-center'>
            <Calendar className={'shelude-calendar'} defaultActiveStartDate={new Date()} onClickMonth={onClickMonth} activeStartDate={calendarDate}  onChange={onClickDay} value={calendarDate} style={{display: 'flex' }}></Calendar>
            <MySelect styles={{control: (baseStyles, state) => ({...baseStyles, width: 100 + '%', height: 61 + 'px' , marginTop: 20 + 'px', marginBottom: 20 + 'px'})}} placeholder={'выберите опреатора'} options={oepratorList} value={user} onChange={setUser}></MySelect>
        </Col>

        <Col md={6} className='d-none d-sm-block'>

            <div className='schelude-info'>

              <div className="shelude-title">Выберите месяц</div>
              <div className='shelude-subtittle'>это необходимо для получения списка всех съёмок за выбранный период</div>

            </div>


        <Row>


          {(authEmail === 'admin@gmail.com') ? <Col className='mt-4'><Link to={'/main/schedule/create'}><MyOperatorButton>Создать</MyOperatorButton></Link></Col> : <></>}

          <Col className='mt-4'><Link to={'/main/schedule/plan'}><MyOperatorButton onClick={() => {console.log('click')}}>Запланировать</MyOperatorButton></Link></Col>
        </Row>


        </Col>
      </Row>



    </div>


    <Row className='mt-2 mb-4'>
      <Col className='d-flex flex-column  justify-content-center' md={12}>

        {(triggerDate === true) ? <ListFilmingDate date={`${calendarDate.getMonth()} месяц`}></ListFilmingDate> : <ListFilmingDate date={calendarDate.toDateString()}></ListFilmingDate>}


          <ul className='card-list'>
            {(cardList.length < 1) ? <div className='empty-card-list'>Список пуст</div> : filterDate()}
          </ul>

      </Col>
    </Row>

    <Row >
      <Col className='d-flex justify-content-center'>

        <Link to={'/main'}><MyButtonBack style={{width: 250 + 'px'}}>НАЗАД</MyButtonBack></Link>

      </Col>
    </Row>






    </>
  )
}

export default ScheludeFilming