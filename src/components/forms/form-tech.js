import './form.css'
import { useEffect, useState } from 'react'
import { Container, Col, Row } from 'react-bootstrap'


// components


import MyInput from '../UI/MyInput'
import MyTextArea from '../UI/MyTextArea'
import MyDate from '../UI/MyDate'
import MySelect from '../UI/MySelect'
import MyButton from '../UI/MyButton'

// server

import streamType from '../../server/streamType'


const FormTech = ({modalTechLike, modalTechDislike}) => {


  const {modalActiveLike, setModalActiveLike} = modalTechLike
  const {modalActiveDislike, setModaActiveDislike} = modalTechDislike

  const [fio, setFio] = useState('')
  const [title, setTitle] = useState('')
  const [phone, setPhone] = useState('')
  const [place, setPlace] = useState('')
  const [type, setType] = useState('')
  const [date, setDate] = useState('')
  const [description, setDescription] = useState('')


  const [columnId, setColumnId] = useState('')

  // timestamp

  const newDate = new Date(date)
  const timestamp = newDate.getTime()




  const fetchIdKey = () => {
    fetch('https://yougile.com/api-v2/auth/companies', {
      method: 'POST',
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify({login: 'Kyle.B@mail.ru', password: 'Metelev1989'})
    }).then(responce => responce.json())
      .then(data => {
        return fetch('https://yougile.com/api-v2/auth/keys/get', {
            method: 'POST',
            headers: {
              'Content-Type':'application/json'
            },
            body: JSON.stringify({login: 'Kyle.B@mail.ru', password: 'Metelev1989', companyId: data.content[0].id})
          })
        }).then(responce => responce.json())
          .then(data => {
            return localStorage.setItem('keyTech', data[0].key)
          })

  }



  const fetchDesk = () => {
    const keyTech = localStorage.getItem('keyTech')
    fetch('https://yougile.com/api-v2/columns', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${keyTech}`
      }
    }).then(responce => responce.json())
      .then(data => {
        setColumnId(data.content[1].id)
      })
  }


  const messageYG = ` ФИО АВТОРА:<br>${fio}<br><br>ТЕЛЕФОН ДЛЯ СВЯЗИ:<br>${phone}<br><br>ТИП ПРОЕКТА:<br>${type.label}<br><br>ОПИСАНИЕ:<br>${description}<br><br>СРОКИ:<br>${date}<br><br>ОПИСАНИЕ<br>${description}`
  const messageTG = ` ФИО АВТОРА: \n ${fio} \n НАЗВАНИЕ ПРОЕКТА: \n ${title} \n ТЕЛЕФОН ДЛЯ СВЯЗИ: \n ${phone} \n ТИП ПРОЕКТА: \n ${type.label} \n ОПИСАНИЕ: \n ${description} \n СРОКИ: \n ${date} \n ОПИСАНИЕ: \n ${description}`


  const fetchAddTask = () => {
    const keyTech = localStorage.getItem('keyTech')
    fetch('https://yougile.com/api-v2/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${keyTech}`
      },
      body: JSON.stringify({title: title, columnId: columnId, description: messageYG, deadline: {deadline: timestamp}})
    }).then(responce => responce.json())
      .then(data => console.log(data))
      .catch(error => console.log(error, 'ERROR'))
  }


  // send to TG


  const sendToTelegram = () => {


    const TOKEN = '6953905275:AAGor-AkqyqG9-RyE6oagsh_Jpl3XnaEeGg'
    const CHAT_ID = '-1002046063150'
    const URL_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`

    fetch(URL_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({chat_id: CHAT_ID, text: messageTG})
    }).then(responce => responce.json())
      .then(data => console.log(data))
      .catch(error => console.log(error, 'ERROR'))

  }



  const sendMessage = () => {
    if (fio !== '' && title !== '' && phone !== '' && place !== '' && description !== '') {

    fetchAddTask()
    sendToTelegram()

    setFio('')
    setTitle('')
    setPhone('')
    setPlace('')
    setDescription('')

    setModalActiveLike(true)
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  } else {
    setModaActiveDislike(true)

  }
}



  useEffect(() => {

    fetchIdKey()
    setTimeout(() => {
      fetchDesk()
    }, 5000)

  }, [])



  return(


    <Col style={{marginLeft: '10px', marginRight: '10px'}}>

      <Col md={12} sm={12} xs={12} className='mt-3'><MyInput style={{width: '100%'}} placeholder={'фио'} value={fio} onChange={(e) => {setFio(e.target.value)}}></MyInput></Col>
      <Col md={12} sm={12} xs={12} className='mt-3'><MyInput style={{width: '100%'}} placeholder={'название проекта'} type={'text'} value={title} onChange={(e) => {setTitle(e.target.value)}}></MyInput></Col>
      <Col md={12} sm={12} xs={12} className='mt-3'><MyInput style={{width: '100%'}} placeholder={'контактная информация'} value={phone} onChange={(e) => {setPhone(e.target.value)}} type={'tel'}></MyInput></Col>
      <Col md={12} sm={12} xs={12} className='mt-3'><MyInput style={{width: '100%'}} placeholder={'место проведения'} type={'text'} value={place} onChange={(e) => {setPlace(e.target.value)}} ></MyInput></Col>


      <Col md={12} sm={12} xs={12} className='mt-3'><MySelect options={streamType} onChange={setType} styles={{control: (styles) => {return {...styles, width: '100%', height: 61 + 'px', borderRadius: 10 + 'px',  marginBottom: 1 + 'px', paddingLeft: 10 + 'px'}}}} placeholder={'тип проекта'}></MySelect></Col>

      <Col md={12} sm={12} xs={12} className='mt-3'><MyTextArea placeholder={'описание'} value={description} onChange={(e) => {setDescription(e.target.value)}}></MyTextArea></Col>

      <Col md={12} sm={12} xs={12} className='mt-3'>

        <div style={{width: '100%', textAlign: 'center'}}>рекомендуемая дата сдачи проекта</div>
        <Col><MyDate style={{width: '100%'}} placeholder={'дата проведения'} value={date} onChange={(e) => {setDate(e.target.value)}}></MyDate></Col>

      </Col>


      <Col md={12} sm={12} xs={12} className='mt-3'>

        <div style={{width: '100%', textAlign: 'center'}}> ПОСЛЕ ПОЛУЧЕНИЯ ИНФОРМАЦИИ С ВАМИ СВЯЖЕТСЯ РУКОВОДИТЕЛЬ НАПРАВЛЕНИЯ ДЛЯ УТОЧНЕНИЯ ИНОФРМАЦИИ</div>
        <MyButton style={{marginTop: 20 + 'px'}} onClick={() => {sendMessage()}}>Создать</MyButton>

      </Col>





    </Col>



  )
}


export default FormTech


