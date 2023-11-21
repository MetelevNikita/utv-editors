// css

import './filming.css'

//

import { useState } from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import { useId } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { getDatabase, ref, set } from "firebase/database";
import uuid from 'react-uuid'

// components

import MyInput from '../../UI/MyInput'
import MyDate from '../../UI/MyDate'
import MyTextArea from '../../UI/MyTextArea'
import MySelect from '../../UI/MySelect'
import MyTime from '../../UI/MyTime'
import MyButton from '../../UI/MyButton'

// server

import oepratorList from '../../../server/operatorList'



const CreateFilming = ({modalOperLike, modalOperDislike}) => {

  const navigate = useNavigate()

  const {modalActiveLike, setModalActiveLike} = modalOperLike
  const {modalActiveDislike, setModaActiveDislike} = modalOperDislike



  const [fio, setFio] = useState('')
  const [title, setTitle] = useState('')
  const [user, setUser] = useState('')
  const [userColor, setUserColor]= useState('')
  const [date, setDate] = useState('')
  const [timeStart, setTimeStart] = useState('')
  const [timeEnd, setTimeEnd] = useState('')
  const [place, setPlace] = useState('')
  const [contacts, setContacts] = useState('')
  const [conditions, setConditions] = useState('')
  const [cloth, setCloth]= useState('')
  const [project, setProject] = useState('')

  const id = uuid()
  const URL_FIREBASE = 'https://utv-edit-list-default-rtdb.firebaseio.com/card.json'

  const selectedUser = () => (user.length < 1) ? ['не выбрано'] : user.map((item) => {return item.label})
  const selectedUserColor = () => (user.length < 1) ? ['не выбрано'] : user.map((item) => {return item.colorId})


  const messageTG = ` ФИО АВТОРА: \n ${fio} \n НАЗВАНИЕ ПРОЕКТА: \n ${title} \n ОПЕРАТОРЫ: \n ${selectedUser().join(' ')} \n ДАТА СЪЕМКИ \n ${new Date(date).toDateString()} \n ВРЕМЯ \n ${timeStart} - ${timeEnd} \n АДРЕС \n ${place} \n КОНТАКТЫ \n ${contacts} \n ОПИСАНИЕ \n ${conditions} \n Проект \n ${project} \n Форма одежды \n ${cloth}`



  const createCard = () => {

    if(fio !== '' && title !== '' && date !== '' && timeStart !== '' && timeEnd !== '' && place !== '' && contacts !== '' && conditions !== '') {

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
        projectPay: project.label,
        cloth: cloth.label

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
    navigate('/main/operator/schedule')

  } else {

    setModaActiveDislike(true)

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
          <MySelect placeholder={'Статус проекта'} name="colors" styles={{control: (baseStyles) => ({...baseStyles, paddingLeft: 10 + 'px' , minHeight: 61 + 'px' , marginTop: 20 + 'px', borderRadius: 10 + 'px', width: 250 + 'px'})}} options={[{label: 'Платный', value: ''}, {label: 'Бюджетный', value: ''}]} value={project} onChange={setProject}></MySelect>
        </Col>

        <Col>
        <MySelect placeholder={'Форма одежды'} name="colors" styles={{control: (baseStyles) => ({...baseStyles, paddingLeft: 10 + 'px' , minHeight: 61 + 'px' , marginTop: 20 + 'px', borderRadius: 10 + 'px', width: 250 + 'px'})}} options={[{label: 'форма UTV', value: ''}, {label: 'Классическая', value: ''}, {label: 'Свободная', value: ''}]} value={cloth} onChange={setCloth}></MySelect>
        </Col>
      </Row>


      <Row className='mt-4'>
        <Col md={6} sm={6} xs={12}>
          <MyButton onClick={() => {createCard()}}>Создать</MyButton>
        </Col>

        <Col md={6} sm={6} xs={12}>
            <Link to={'/main/operator'}><MyButton>Назад</MyButton></Link>
        </Col>
      </Row>

    </div>
  )
}

export default CreateFilming