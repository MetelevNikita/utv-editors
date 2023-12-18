// css

import './filming.css'

//

import { useEffect, useState } from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import { useId } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { getDatabase, ref, set, get, onValue } from "firebase/database";
import uuid from 'react-uuid'

// components

import MyInput from '../../UI/MyInput'
import MyDate from '../../UI/MyDate'
import MyTextArea from '../../UI/MyTextArea'
import MySelect from '../../UI/MySelect'
import MyTime from '../../UI/MyTime'
import MyButton from '../../UI/MyButton'
import MyButtonBack from '../../UI/MyButtonBack'

// server

import oepratorList from '../../../server/operatorList'
import operatorProject from '../../../server/operatorProject'
import operatorCloth from '../../../server/operatorCloth'



const CreateFilming = ({modalOperLike, modalOperDislike}) => {

  const navigate = useNavigate()

  const {modalActiveLike, setModalActiveLike} = modalOperLike
  const {modalActiveDislike, setModaActiveDislike} = modalOperDislike

  const [cardList, setCardList] = useState([])



  const [fio, setFio] = useState('')
  const [title, setTitle] = useState('')
  const [user, setUser] = useState([])
  const [userColor, setUserColor]= useState('')
  const [date, setDate] = useState('')
  const [timeStart, setTimeStart] = useState('')
  const [timeEnd, setTimeEnd] = useState('')
  const [place, setPlace] = useState('')
  const [contacts, setContacts] = useState('')
  const [conditions, setConditions] = useState('')
  const [cloth, setCloth]= useState({label: 'не выбрано', value: ''})
  const [project, setProject] = useState({label: 'не выбрано', value: ''})

  const id = uuid()

  console.log(timeStart)




  // getCard


  const getCard = () => {

    const db = getDatabase()
    const cardBase = ref(db, 'cardsFilming/')
    onValue(cardBase, (snapshot) => {
      const data = snapshot.val()
      setCardList(Object.values(data))
    })
  }


  const userArr = user.map((item) => {
    return item.label
  })


  const filterCard = cardList.filter((userList) => {
    return userList.user.includes(userArr)
  })

  const dateCardList = filterCard.filter((item) => {
    return item.date === new Date(date).toDateString()
  })

  //

  const filterTimeStart = dateCardList.map((item) => {return item.timeStart})
  const filterTimeEnd = dateCardList.map((item) => {return item.timeEnd})

  console.log(filterTimeStart)
  console.log(filterTimeEnd)



  const filter = () => {

    return filterTimeStart >= '14:00'
  }

















  useEffect(() => {
    getCard()
  }, [])



  // createCard


  const selectedUser = () => (user.length < 1) ? ['не выбрано'] : user.map((item) => {return item.label})
  const selectedUserColor = () => (user.length < 1) ? ['не выбрано'] : user.map((item) => {return item.colorId})

  const messageTG = ` ФИО АВТОРА: \n ${fio} \n \n НАЗВАНИЕ ПРОЕКТА: \n ${title} \n \n ОПЕРАТОРЫ: \n ${selectedUser().join(' ')} \n \n ДАТА СЪЕМКИ \n ${new Date(date).toDateString()} \n \n ВРЕМЯ \n ${timeStart} - ${timeEnd} \n \n АДРЕС \n ${place} \n \n КОНТАКТЫ \n ${contacts} \n \n ОПИСАНИЕ \n ${conditions} \n \n Проект \n ${project.label} \n \n Форма одежды \n ${cloth.label}`

  const createCard = () => {







  if (fio === '' || title === '' || date === '' || timeStart === '' || timeEnd === '' || place === '' || contacts === '' || conditions === '') {
      return setModaActiveDislike(true)
    }


    if(!filterTimeStart.includes(timeStart) && !filterTimeEnd.includes(timeEnd)) {


      const db = getDatabase()
      set(ref(db, 'cardsFilming/' + id), {

        id: id,
        name: fio,
        title: title,
        user: selectedUser().join(' '),
        userColor: selectedUserColor().join(),
        date: new Date(date).toDateString(),
        timeStart: timeStart,
        timeEnd: timeEnd,
        place: place,
        contacts: contacts,
        conditions: conditions,
        cloth: cloth.label,
        projectPay: project.label

      })
      selectedIdUserSend()

      setFio('')
      setTitle('')
      setUser('')
      setDate('')
      setTimeStart('')
      setTimeEnd('')
      setPlace('')
      setConditions('')
      setContacts('')
      setModalActiveLike(true)
      navigate('/main/operator/schedule/create')
    } else {

      return alert('Данное время занято')
    }

   }





  const selectedIdUserSend = () => {
    return (user.length < 1) ? ['не определен'] : user.map((item) => {


      const TOKEN = '6953905275:AAGor-AkqyqG9-RyE6oagsh_Jpl3XnaEeGg'
      const URL_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`


      return fetch(URL_API, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({chat_id: item.value, text: messageTG})
            }).then(responce => responce.json())
              .then(data => console.log(data))
              .catch(error => console.log(error, 'ERROR'))
          })
  }









  return(
    <div className="filming-container">

      <MyInput placeholder={'ФИО'} style={{marginTop: 20 + 'px'}} value={fio} onChange={(e) => {setFio(e.target.value)}}></MyInput>
      <MyInput placeholder={'Название съёмки'} style={{marginTop: 20 + 'px'}} value={title} onChange={(e) => {setTitle(e.target.value)}}></MyInput>

      <Row className='d-flex justify-content-md-center'>

            <Col className='mt-1 d-flex' md={6} sm={12} xs={12}>

                <MySelect placeholder={'Выберите оператора'} isMulti name="colors" styles={{control: (baseStyles) => ({...baseStyles, paddingLeft: 10 + 'px' , minHeight: 61 + 'px' , marginTop: 20 + 'px', borderRadius: 10 + 'px'})}} options={oepratorList} value={user} onChange={setUser}></MySelect>

            </Col>



            <Col className='mt-1 d-flex justify-content-center' md={6} sm={12} xs={12}>

                  <MyDate style={{marginTop: 20 + 'px', paddingLeft: 30 + 'px'}} value={date} onChange={(e) => {setDate(e.target.value)}}></MyDate>

            </Col>

      </Row>


      <Row className='d-flex justify-content-md-center'>

          <Col className='mt-4 mb-4 d-flex justify-content-center' md={6} sm={12} xs={12}>

              <MyTime title={'время начала съёмки'} value={timeStart} onChange={(e) => {setTimeStart(e.target.value)}}></MyTime>

          </Col>

          <Col className='mt-4 mb-4 d-flex justify-content-center' md={6} sm={12} xs={12}>

              <MyTime title={'время окончания съёмки'} value={timeEnd} onChange={(e) => {setTimeEnd(e.target.value)}}></MyTime>

          </Col>

      </Row>

      <MyInput placeholder={'место съёмки'} style={{marginTop: 20 + 'px'}} value={place} onChange={(e) => {setPlace(e.target.value)}}></MyInput>
      <MyInput placeholder={'контакты'} style={{marginTop: 20 + 'px'}} value={contacts} onChange={(e) => {setContacts(e.target.value)}}></MyInput>

      <MyTextArea placeholder={'условия съёмки'} style={{marginTop: 20 + 'px'}} value={conditions} onChange={(e) => {setConditions(e.target.value)}}></MyTextArea>

      <Row>
        <Col>
          <MySelect placeholder={'Статус проекта'} name="colors" styles={{control: (baseStyles) => ({...baseStyles, paddingLeft: 10 + 'px' , minHeight: 61 + 'px' , marginTop: 20 + 'px', borderRadius: 10 + 'px', width: 250 + 'px'})}} defaultValue={{label: 'не выбрано', value: ''}} options={operatorProject} value={project} onChange={setProject}></MySelect>
        </Col>

        <Col>
        <MySelect placeholder={'Форма одежды'} name="colors" styles={{control: (baseStyles) => ({...baseStyles, paddingLeft: 10 + 'px' , minHeight: 61 + 'px' , marginTop: 20 + 'px', borderRadius: 10 + 'px', width: 250 + 'px'})}} defaultValue={{label: 'не выбрано', value: ''}} options={operatorCloth} value={cloth} onChange={setCloth}></MySelect>
        </Col>
      </Row>


      <Row className='mt-4'>
        <Col md={6} sm={6} xs={12} className='mb-4'>
          <MyButton onClick={() => {createCard()}}>Создать</MyButton>
        </Col>

        <Col md={6} sm={6} xs={12} className='mb-4'>
            <Link to={'/main/main/schedule'}><MyButtonBack>НАЗАД</MyButtonBack></Link>
        </Col>
      </Row>

    </div>
  )
}

export default CreateFilming