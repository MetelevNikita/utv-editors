// css

import './filming.css'

//

import { Link } from 'react-router-dom'
import { Col } from 'react-bootstrap'
import { useState } from 'react'

// redux


import { useSelector } from 'react-redux'

// components

import MyInput from '../../UI/MyInput'
import MyTextArea from '../../UI/MyTextArea'
import MyDate from '../../UI/MyDate'
import MyTime from '../../UI/MyTime'
import MyButton from '../../UI/MyButton'
import MyButtonBack from '../../UI/MyButtonBack'
import MyCheckBox from '../../UI/MyCheckBox'



const PlanFilming = ({modalOperLike, modalOperDislike}) => {

  const users = useSelector(state => state.users.users)
  const email = sessionStorage.getItem('email')
  const singleUser = users.filter((user) => user.email.toLowerCase() === email)[0]


  const { setModalActiveLike } = modalOperLike
  const { setModaActiveDislike } = modalOperDislike

  const [fio, setFio] = useState('')
  const [contacts, setContacts] = useState('')
  const [title, setTitle] = useState('')
  const [adress, setAdress] = useState('')
  const [timeStart, setTimeStart] = useState('')
  const [timeEnd, setTimeEnd] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')

  // check


  const [techCheck, setTechCheck] = useState(false)
  const [soundCheck, setSoundCheck] = useState(false)



  const messageTG = `ЗАЯВКА НА СЪЁМКУ \n \n  АВТОР \n ${fio} \n КОНТАКТЫ \n ${contacts} \n ПРОЕКТ \n ${title} \n ОПИСАНИЕ \n ${description} \n ДАТА \n ${date} (${timeStart} - ${timeEnd}) \n АДРЕС \n ${adress} \n \n После сооздания съёмки просьба связаться с автором для подтверждения.\n\n\n Участие технического отдела ${(techCheck) ? 'ДА' : 'НЕТ'}\n\n Участие звукорежиссера ${(soundCheck) ? 'ДА' : 'НЕТ'}`



  const sendMessageTg = () => {

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

  const sendMessage = () => {

    if(contacts !== '' && title !== '' && description !== '' && date !== '' && timeStart !== '' && timeEnd !== '' && adress !== '') {

          sendMessageTg()
          setModalActiveLike(true)


          setFio('')
          setAdress('')
          setTitle('')
          setAdress('')
          setDate('')
          setTimeEnd('')
          setTimeStart('')
          setDescription('')

      } else {
                setModaActiveDislike(true)
      }


  }


  console.log(techCheck)
  console.log(soundCheck)



  return(

    <Col>

      <Col style={{width: '100%', textAlign: 'center', fontSize: '22px'}} className='mt-3'>Заявка на съёмку</Col>

      <Col style={{width: '100%', textAlign: 'center', fontSize: '16px'}} className='mt-3'>Заявка попадет на рассмотрения к руководителю операторов, после анализа заявки вам придет сообщение о постановке съёмке в назанченный период или с изменениями по времени</Col>

      {/*  */}

      {(singleUser) ? <Col md={12} sm={12} xs={12} className='mt-3'><MyInput disabled={true} placeholder={'фио'} style={{width: '100%'}} value={`${singleUser.name} ${singleUser.lastName}`} onChange={(e) => {setFio(e.target.value)}}></MyInput></Col> : <Col md={12} sm={12} xs={12} className='mt-3'><MyInput placeholder={'фио'} style={{width: '100%'}} value={fio} onChange={(e) => {setFio(e.target.value)}}></MyInput></Col>}

      <Col md={12} sm={12} xs={12} className='mt-3'><MyInput placeholder={'контакты'} style={{width: '100%'}} value={contacts} onChange={(e) => {setContacts(e.target.value)}}></MyInput></Col>

      <Col md={12} sm={12} xs={12} className='mt-3'><MyInput placeholder={'название съёмки'} style={{width: '100%'}} value={title} onChange={(e) => {setTitle(e.target.value)}}></MyInput></Col>

      <Col md={12} sm={12} xs={12} className='mt-3'><MyInput placeholder={'адрес'} style={{width: '100%'}} value={adress} onChange={(e) => {setAdress(e.target.value)}}></MyInput></Col>


      <Col md={12} sm={12} xs={12} className='d-flex justify-content-md-between justify-content-center align-items-center flex-md-row flex-column'>


      <Col md={6} sm={12} xs={12} className='mt-3'><MyTime style={{width: '98%'}} title={'время начала съёмки'} value={timeStart} onChange={(e) => {setTimeStart(e.target.value)}}></MyTime></Col>

      <Col md={6} sm={12} xs={12} className='mt-3'> <MyTime style={{width: '98%'}} title={'время окончания съёмки'} value={timeEnd} onChange={(e) => {setTimeEnd(e.target.value)}}></MyTime></Col>


      </Col>



      <Col md={12} sm={12} xs={12} className='mt-4'><MyTextArea placeholder={'описание'} style={{width: '100%'}} value={description} onChange={(e) => {setDescription(e.target.value)}}></MyTextArea></Col>


      <Col md={12} sm={12} xs={12} className='mt-3'>

        <div className='filming-deadline'>Дата съёмки</div>
        <Col><MyDate style={{width: '100%'}} value={date} onChange={(e) => {setDate(e.target.value)}}></MyDate></Col>

      </Col>


      <Col md={12} sm={12} xs={12} className='mt-3'>

        <MyCheckBox title={'Проставьте галочку если необходимо участие технического отдела на съёмке'} info={'Участие технического отдела'} checked={techCheck} onChange={() => {setTechCheck(prev => !prev)}}></MyCheckBox>
        <MyCheckBox title={'Проставьте галочку если необходимо участие звукорежиссера на съёмке'} info={'Участие звукорежиссера'} checked={soundCheck} onChange={() => {setSoundCheck(prev => !prev)}}></MyCheckBox>

      </Col>




      <Col md={12} sm={12} xs={12} className='d-flex justify-content-md-between justify-content-center align-items-center flex-md-row flex-column'>

        <Col md={6} sm={12} xs={12} className='mt-3'><MyButton onClick={() => {sendMessage()}}>Запланировать</MyButton></Col>
        <Col md={6} sm={12} xs={12} className='mt-3'><Link to={'/main/schedule'}><MyButtonBack>Назад</MyButtonBack></Link></Col>

      </Col>


      </Col>



  )
}

export default PlanFilming