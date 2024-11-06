// css

import './filming.css'

//

import { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { getDatabase, ref, set, get, onValue } from "firebase/database";
import uuid from 'react-uuid'


// redux

import { useSelector } from 'react-redux'

// components

import MyInput from '../../UI/MyInput'
import MyDate from '../../UI/MyDate'
import MyTextArea from '../../UI/MyTextArea'
import MySelect from '../../UI/MySelect'
import MyTime from '../../UI/MyTime'
import MyButton from '../../UI/MyButton'
import MyButtonBack from '../../UI/MyButtonBack'
import MyCheckBox from '../../UI/MyCheckBox'

// server

import operatorList from '../../../server/operatorList'
import operatorProject from '../../../server/operatorProject'
import operatorCloth from '../../../server/operatorCloth'
import operatorCotegory from '../../../server/operatorCotegory'



const CreateFilming = ({modalOperLike, modalOperDislike}) => {

  const navigate = useNavigate()
  const users = useSelector(state => state.users.users)






  const { setModalActiveLike} = modalOperLike
  const { setModaActiveDislike} = modalOperDislike

  const [cardList, setCardList] = useState([])
  const [fio, setFio] = useState('')
  const [title, setTitle] = useState('')
  const [user, setUser] = useState([])
  const [userColor, setUserColor]= useState('')
  const [date, setDate] = useState([null, null])
  const [timeStart, setTimeStart] = useState('')
  const [timeEnd, setTimeEnd] = useState('')
  const [place, setPlace] = useState('')
  const [contacts, setContacts] = useState('')
  const [conditions, setConditions] = useState('')
  const [cloth, setCloth]= useState({label: 'не выбрано', value: ''})
  const [project, setProject] = useState({label: 'не выбрано', value: ''})
  const [type, setType] = useState('')

  const [selectUser, setSelectUser] = useState('')


  // rangeDate

  const [dates, setDates] = useState([])


  // check

  const [techCheck, setTechCheck] = useState(false)
  const [soundCheck, setSoundCheck] = useState(false)




  const userEmail = sessionStorage.getItem('email')

  const techTGid = '-1002046063150'
  const soundTgId = '334273478'

  // getUsers


  const userSelect = (!users) ? [{value: 'не выбрано', label: 'не выбрано'}] : users.map((item) => {
    return {
      value: item.tgId,
      label: item.name
    }
  })



  // getCard


  const getCard = () => {

    const db = getDatabase()
    const cardBase = ref(db, 'cardsFilming/')
    onValue(cardBase, (snapshot) => {
      const data = snapshot.val()
      setCardList(Object.values(data))
    })
  }


  const userArr = (user.length < 1) ? ['не определен'] : user.map((item) => {return item.label})

  const filterCard = cardList.filter((userList) => {
    return userList.user.includes(userArr)
  })

  const dateCardList = filterCard.filter((item) => {
    return item.date === new Date(date).toDateString()
  })

  //

  const filterTimeStart = dateCardList.map((item) => {
      return item.timeStart
  })
  const filterTimeEnd = dateCardList.map((item) => {
    if(item.timeEnd === '') {
      return Math.random()
    } else {
      return item.timeEnd
    }
  })




  useEffect(() => {
    rangeDate(date[0], date[1])
    getCard()
  }, [date[0], date[1]])





  // createCard


  const selectedUser = () => (user.length < 1) ? ['не выбрано'] : user.map((item) => {return item.label})
  const selectedUserColor = () => (user.length < 1) ? ['не выбрано'] : user.map((item) => {return item.colorId})


//


  const messageTG = (date) => {

    return (title !== '') ? `${new Date(date).toDateString()} \n${timeStart} - ${timeEnd}\n${title}\nКонтакт: ${contacts}\nАдрес: ${place}\n\nОписание: ${conditions}\n\nПроект\n ${project.label}\nФорма одежды\n${cloth.label} \nОПЕРАТОРЫ:\n${selectedUser().join(' ')}\n\nУчастие технического отдела ${(techCheck) ? 'ДА' : 'НЕТ'}\n\nУчастие звукорежиссера ${(soundCheck) ? 'ДА' : 'НЕТ'}` : `${type.label}\n${new Date(date).toDateString()}\nВремя: ${type.value}\n${title}\nОПЕРАТОРЫ:\n${selectedUser().join(' ')}\n\nУчастие технического отдела ${(techCheck) ? 'ДА' : 'НЕТ'}\n\nУчастие звукорежиссера ${(soundCheck) ? 'ДА' : 'НЕТ'}`

  }

  const messageAuthorTG = (date) => {


    return (title !== '') ? `СЪЁМКА ПОДТВЕРЖДЕНА!\n\n${new Date(date).toDateString()}\n${timeStart} - ${timeEnd}\n${title}\nАдрес: ${place}\n\nОписание: ${conditions}\n\nПроект\n${project.label}\n\nОПЕРАТОРЫ:\n${selectedUser().join(' ')}\n\nУчастие технического отдела ${(techCheck) ? 'ДА' : 'НЕТ'}\n\nУчастие звукорежиссера ${(soundCheck) ? 'ДА' : 'НЕТ'}` : `${type.label}\n${new Date(date).toDateString()}\nВремя: ${type.value}\n${title}\nОПЕРАТОРЫ:\n ${selectedUser().join(' ')}\n\nУчастие технического отдела ${(techCheck) ? 'ДА' : 'НЕТ'}\n\nУчастие звукорежиссера ${(soundCheck) ? 'ДА' : 'НЕТ'}`

  }






  const rangeDate = (dateStart, dateEnd) => {
    try {


      if (dateEnd !== null) {

      const dateArr = []
      for (let date = new Date(dateStart); date <= new Date(dateEnd); date.setDate(date.getDate() + 1)) {
        dateArr.push(date.toISOString().slice(0, 10))
      }
      setDates(dateArr)

    } else {
      setDates([dateStart])

    }



    } catch (error) {
      console.log(error)
    }
  }



  const checkTimeCreateCard = () => {

    if(filterTimeStart.includes(timeStart) && filterTimeEnd.includes(timeEnd)) {
      return alert('Данное время занято')
    }

    createCard()

  }


  const createDatabase = () => {
    const db = getDatabase()


  }


  const createCard = () => {

    if (fio === '' || date === '' ) {
        return setModaActiveDislike(true)
      }

      const db = getDatabase()


      dates.forEach((item, index) => {
        const id = uuid()

        set(ref(db, 'cardsFilming/' + `${id}`), {

          id: id,
          name: fio,
          type: type.label,
          title: title,
          user: selectedUser().join(' '),
          userColor: selectedUserColor().join(),
          date: new Date(item).toDateString(),
          timeStart: (timeStart === '') ? type.value : timeStart,
          timeEnd: (timeEnd === '') ? type.value : timeEnd,
          place: place,
          contacts: contacts,
          conditions: conditions,
          cloth: cloth.label,
          projectPay: project.label,
          techEngineer: techCheck,
          soundEngineer: soundCheck


        })

        selectedIdUserSend(item)
        selectedAuthorSend(item)

        if(techCheck) {
          selectedSupportSend(techTGid, item)
        }

        if(soundCheck) {
          selectedSupportSend(soundTgId, item)
        }

      })


      console.log(date)



      setFio('')
      setTitle('')
      setUser('')
      setTimeStart('')
      setTimeEnd('')
      setPlace('')
      setConditions('')
      setContacts('')
      setModalActiveLike(true)
      setTechCheck(false)
      setSoundCheck(false)

      //

      navigate('/main/schedule/create')


   }






  const selectedIdUserSend = async (date) => {
    return (user.length < 1) ? ['не определен'] : user.map(async (item) => {

      const TOKEN = '6953905275:AAGor-AkqyqG9-RyE6oagsh_Jpl3XnaEeGg'
      const URL_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`

      try {

        const responce = await fetch(URL_API, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({chat_id: item.value, text: messageTG(date)})
        })

        const data = await responce.json()
        return data

      } catch (error) {

        console.error(`Оишбка отправки сообщения исполнителям - ${error}`)

      }

      })
    }


  const selectedAuthorSend = async (date) => {

    const TOKEN = '6953905275:AAGor-AkqyqG9-RyE6oagsh_Jpl3XnaEeGg'
    const URL_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`


    try {
      const responce = await fetch(URL_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ chat_id: selectUser.value, text: messageAuthorTG(date)})
      })
      const data = await responce.json()
      return data
    } catch (error) {
      console.error(`Ошибка отправки сообщения автору - ${error}`)
    }
  }



  const selectedSupportSend = async (id, date) => {

    const TOKEN = '6953905275:AAGor-AkqyqG9-RyE6oagsh_Jpl3XnaEeGg'
    const URL_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`

    try {

      const responce = await fetch(URL_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({chat_id: id, text: messageTG(date)})
      })

      const data = await responce.json()
      console.log(data)
      return data



    } catch (error) {
      console.error(`Ошибка отправки сообщения технический отдел - ${error}`)
    }
  }




  return(


    <Col>

        <Col md={12} sm={12} xs={12} className='d-flex justify-content-md-between justify-content-center align-items-center flex-md-row flex-column'>

        <Col md={6} sm={12} xs={12} className='mt-3'><MyInput style={{width: '98%', marginTop: '4px'}} placeholder={'ФИО'} value={fio} onChange={(e) => {setFio(e.target.value)}}></MyInput></Col>
        <Col md={6} sm={12} xs={12} className='mt-3'><MySelect placeholder={'выберите категорию'} styles={{control: (baseStyles) => ({...baseStyles, paddingLeft: 10 + 'px' , minHeight: 61 + 'px', borderRadius: 10 + 'px', width: '100%'})}} options={operatorCotegory} value={type} onChange={setType}></MySelect></Col>

        </Col>


      {(type.label === 'ПРОСТАЯ СЪЁМКА') ? <Col md={12} sm={12} xs={12} className='mt-3'><MyInput style={{width: '100%'}} placeholder={'название съёмки'} value={title} onChange={(e) => {setTitle(e.target.value)}}></MyInput></Col> : <></>}

      <Col md={12} sm={12} xs={12} className='d-flex justify-content-md-between justify-content-center align-items-center flex-md-row flex-column'>

          <Col md={12} sm={12} xs={12} className='mt-3'><MySelect placeholder={'выберите оператора'} isMulti name="colors" styles={{control: (baseStyles) => ({...baseStyles, paddingLeft: 10 + 'px' , minHeight: 61 + 'px', borderRadius: 10 + 'px'})}} options={operatorList} value={user} onChange={setUser}></MySelect></Col>

      </Col>


      <Col md={12} sm={12} xs={12} className='d-flex justify-content-md-between justify-content-center align-items-center flex-md-row flex-column'>

            <Col md={6} sm={12} xs={12} className='mt-3'>
            <span style={{marginLeft: '30px'}}>Выберите дату начала</span>
            <MyDate style={{paddingLeft: 30 + 'px', width: '100%'}} value={date[0]} onChange={(e) => {setDate([e.target.value, null])}}></MyDate>
            </Col>
            <Col md={6} sm={12} xs={12} className='mt-3'>
            <span style={{marginLeft: '30px'}}>Выберите дату окончания</span>
            <MyDate style={{paddingLeft: 30 + 'px', width: '100%'}} value={date[1]} min={date[0]} onChange={(e) => {setDate([date[0], e.target.value])}}></MyDate>
            </Col>

      </Col>



      <Col md={12} sm={12} xs={12} className='d-flex justify-content-md-between justify-content-center align-items-center flex-md-row flex-column'>

          <Col md={6} sm={12} xs={12} className='mt-3'>
          {(type.label === 'ПРОСТАЯ СЪЁМКА') ? <MyTime style={{width: '98%'}} title={'время начала съёмки'} value={timeStart} onChange={(e) => {setTimeStart(e.target.value)}}></MyTime> : <></>}
          </Col>

          <Col md={6} sm={12} xs={12} className='mt-3'>
          {(type.label === 'ПРОСТАЯ СЪЁМКА') ? <MyTime style={{width: '98%'}} title={'время окончания съёмки'} value={timeEnd} onChange={(e) => {setTimeEnd(e.target.value)}}></MyTime> : <></>}
          </Col>

      </Col>



      {(type.label === 'ПРОСТАЯ СЪЁМКА') ? <>

        <Col md={12} sm={12} xs={12} className='mt-3'><MyInput placeholder={'место съёмки'} style={{width: '100%'}} value={place} onChange={(e) => {setPlace(e.target.value)}}></MyInput></Col>
        <Col md={12} sm={12} xs={12} className='mt-3'><MyInput placeholder={'контакты'} style={{width: '100%'}} value={contacts} onChange={(e) => {setContacts(e.target.value)}}></MyInput></Col>

        <Col md={12} sm={12} xs={12} className='mt-3'><MyTextArea placeholder={'условия съёмки'} style={{width: '100%'}} value={conditions} onChange={(e) => {setConditions(e.target.value)}}></MyTextArea></Col>

      </>  : <></>}


      {(type.label === 'ПРОСТАЯ СЪЁМКА') ? <>

        <Row md={12} sm={12} xs={12} className='d-flex justify-content-md-between justify-content-center align-items-center flex-md-row flex-column'>
          <Col md={6} sm={12} xs={12} className='mt-3'>
            <MySelect placeholder={'Статус проекта'} name="colors" styles={{control: (baseStyles) => ({...baseStyles, paddingLeft: 10 + 'px' , minHeight: 61 + 'px', borderRadius: 10 + 'px', width: '100%'})}} defaultValue={{label: 'не выбрано', value: ''}} options={operatorProject} value={project} onChange={setProject}></MySelect>
          </Col>

          <Col md={6} sm={12} xs={12} className='mt-3'>
          <MySelect placeholder={'Форма одежды'} name="colors" styles={{control: (baseStyles) => ({...baseStyles, paddingLeft: 10 + 'px' , minHeight: 61 + 'px', borderRadius: 10 + 'px', width: '100%'})}} defaultValue={{label: 'не выбрано', value: ''}} options={operatorCloth} value={cloth} onChange={setCloth}></MySelect>
          </Col>
        </Row>

        <Col md={12} sm={12} xs={12} className='mt-3' style={{fontSize: '12px'}}>Выберите автора для обратного сообщения о просталенной съёмке</Col>
        <Col md={12} sm={12} xs={12} className='mt-1'><MySelect placeholder={'автор'} options={userSelect} styles={{control: (baseStyles) => ({...baseStyles, paddingLeft: 10 + 'px', minHeight: 61 + 'px', borderRadius: 10 + 'px', width: '100%'})}} onChange={setSelectUser}></MySelect></Col>

        <Col md={12} sm={12} xs={12} className='mt-3'>

          <MyCheckBox title={'Проставьте галочку если необходимо участие технического отдела на съёмке'} info={'Участие технического отдела'} checked={techCheck} onChange={() => {setTechCheck(prev => !prev)}}></MyCheckBox>
          <MyCheckBox title={'Проставьте галочку если необходимо участие звукорежиссера на съёмке'} info={'Участие звукорежиссера'} checked={soundCheck} onChange={() => {setSoundCheck(prev => !prev)}}></MyCheckBox>

        </Col>

      </> : <></> }







      <Row className='mt-3'>
        <Col md={6} sm={6} xs={12} className='mb-4'>
          <MyButton onClick={() => {(userEmail === 'admin@gmail.com') ? createCard() : checkTimeCreateCard()}}>Создать</MyButton>
        </Col>

        <Col md={6} sm={6} xs={12} className='mb-4'>
            <Link to={'/main/main/schedule'}><MyButtonBack>НАЗАД</MyButtonBack></Link>
        </Col>
      </Row>

    </Col>
  )
}

export default CreateFilming