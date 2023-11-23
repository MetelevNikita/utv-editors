// css

import './filming.css'

//

import { Link } from 'react-router-dom'
import { Container, Col, Row } from 'react-bootstrap'
import { useState } from 'react'

// components

import MyInput from '../../UI/MyInput'
import MySelect from '../../UI/MySelect'
import MyTextArea from '../../UI/MyTextArea'
import MyDate from '../../UI/MyDate'
import MyTime from '../../UI/MyTime'
import MyButton from '../../UI/MyButton'
import MyButtonBack from '../../UI/MyButtonBack'



const PlanFilming = () => {

  const [fio, setFio] = useState('')
  const [contacts, setContacts] = useState('')
  const [title, setTitle] = useState('')
  const [adress, setAdress] = useState('')
  const [timeStart, setTimeStart] = useState('')
  const [timeEnd, setTimeEnd] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')



  const messageTG = `ЗАЯВКА НА СЪЁМКУ \n \n  АВТОР \n ${fio} \n КОНТАКТЫ \n ${contacts} \n ПРОЕКТ \n ${title} \n ОПИСАНИЕ \n ${description} \n ДАТА \n ${date} (${timeStart} - ${timeEnd}) \n АДРЕС \n ${adress} \n \n После сооздания съёмки просьба связаться с автором для подтверждения.`


  const sendMessage = () => {

    const TOKEN = '6953905275:AAGor-AkqyqG9-RyE6oagsh_Jpl3XnaEeGg'
    const URL_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`


    return fetch(URL_API, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({chat_id: '245168122', text: messageTG})
          }).then(responce => responce.json())
            .then(data => console.log(data))
            .catch(error => console.log(error, 'ERROR'))
  }



  return(

    <div className="filming-container">

      <div className='plan-card-title'>Заявка на съёмку</div>

      <div className='plan-card-subtitle'>Заявка попадет на рассмотрения к руководителю операторов, после анализа заявки вам придет сообщение о постановке съёмке в назанченный период или с изменениями по времени</div>

      <MyInput placeholder={'фио'} style={{marginTop: 20 + 'px'}} value={fio} onChange={(e) => {setFio(e.target.value)}}></MyInput>
      <MyInput placeholder={'контакты'} style={{marginTop: 20 + 'px'}} value={contacts} onChange={(e) => {setContacts(e.target.value)}}></MyInput>
      <MyInput placeholder={'название съёмки'} style={{marginTop: 20 + 'px'}} value={title} onChange={(e) => {setTitle(e.target.value)}}></MyInput>
      <MyInput placeholder={'адрес'} style={{marginTop: 20 + 'px'}} value={adress} onChange={(e) => {setAdress(e.target.value)}}></MyInput>

      <Row className='d-flex justify-content-center'>

        <Col className='mt-3 mb-4 d-flex justify-content-center' md={6} sm={12} xs={12}>

        <MyTime title={'время окончания съёмки'} value={timeStart} onChange={(e) => {setTimeStart(e.target.value)}}></MyTime>

        </Col>

        <Col className='mt-3 mb-4 d-flex justify-content-center' md={6} sm={12} xs={12}>

        <MyTime title={'время окончания съёмки'} value={timeEnd} onChange={(e) => {setTimeEnd(e.target.value)}}></MyTime>

        </Col>

      </Row>


      <MyTextArea placeholder={'описание'} style={{marginTop: 20 + 'px'}} value={description} onChange={(e) => {setDescription(e.target.value)}}></MyTextArea>

      <div className='filming-deadline'>Дата съёмки</div>
      <MyDate style={{marginTop: 10 + 'px'}} value={date} onChange={(e) => {setDate(e.target.value)}}></MyDate>


      <Row className='mt-4'>
        <Col>
            <MyButton onClick={() => {sendMessage()}}>Запланировать</MyButton>
        </Col>


        <Col>

        <Link to={'/main/schedule'}><MyButtonBack>Назад</MyButtonBack></Link>

        </Col>
      </Row>








    </div>
  )
}

export default PlanFilming