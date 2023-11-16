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

import streamType from '../streamType'


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
        console.log(data.content)
        return fetch('https://yougile.com/api-v2/auth/keys/get', {
            method: 'POST',
            headers: {
              'Content-Type':'application/json'
            },
            body: JSON.stringify({login: 'Kyle.B@mail.ru', password: 'Metelev1989', companyId: data.content[0].id})
          })
        }).then(responce => responce.json())
          .then(data => {
            console.log(data)
            return localStorage.setItem('keyTech', data[0].key)
          })

  }

  const keyTech = localStorage.getItem('keyTech')


  const fetchDesk = () => {
    fetch('https://yougile.com/api-v2/columns', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${keyTech}`
      }
    }).then(responce => responce.json())
      .then(data => {
        console.log(data.content)
        setColumnId(data.content[2].id)
      })
  }

  console.log(columnId)

  const messageYG = ` ФИО АВТОРА: ${fio} ТЕЛЕФОН ДЛЯ СВЯЗИ: ${phone} ТИП ПРОЕКТА: ${type.label} ОПИСАНИЕ: ${description} СРОКИ: ${date} ОПИСАНИЕ ${description}`

  const messageTG = ` ФИО АВТОРА: \n ${fio} \n НАЗВАНИЕ ПРОЕКТА: \n ${title} \n ТЕЛЕФОН ДЛЯ СВЯЗИ: \n ${phone} \n ТИП ПРОЕКТА: \n ${type.label} \n ОПИСАНИЕ: \n ${description} \n СРОКИ: \n ${date} \n ОПИСАНИЕ: \n ${description}`


  const fetchAddTask = () => {
    fetch('https://yougile.com/api-v2/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${keyTech}`
      },
      body: JSON.stringify({title: title, columnId: columnId, description: messageYG, deadline: {deadline: timestamp}})
    }).then(responce => responce.json())
      .then(data => console.log(data))
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

  }





  const sendMessage = () => {

    if (fio !== '' && title !== '' && phone !== '' && place !== '' && description !== '') {

    console.log('отправлено')
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
    }, 3000)
  }, [])








  return(


    <div className="form-container">
      <MyInput placeholder={'ФИО'} style={{marginTop: 20 + 'px'}} value={fio} onChange={(e) => {setFio(e.target.value)}}></MyInput>
      <MyInput placeholder={'НАЗВАНИЕ ПРОЕТА'} type={'text'} value={title} onChange={(e) => {setTitle(e.target.value)}} style={{marginTop: 20 + 'px'}}></MyInput>
      <MyInput placeholder={'ТЕЛЕФОН С КЕМ ДЕРЖАТЬ СВЗЯЬ'} value={phone} onChange={(e) => {setPhone(e.target.value)}} type={'tel'} style={{marginTop: 20 + 'px'}}></MyInput>
      <MyInput placeholder={'МЕСТО ПРОВЕДЕНИЯ'} type={'text'} value={place} onChange={(e) => {setPlace(e.target.value)}} style={{marginTop: 20 + 'px'}}></MyInput>

      <Row className='form-box mt-3 d-flex justify-content-around'>


      <Col md={6} xs={12}>
        <MySelect options={streamType} onChange={setType} styles={{control: (styles) => {return {...styles, width: 274 + 'px', height: 61 + 'px', borderRadius: 10 + 'px',  marginBottom: 1 + 'px', paddingLeft: 10 + 'px'}}}} placeholder={'тип проекта'}></MySelect>
      </Col>


      <Col md={6} xs={12}>
        <MyDate  placeholder={'дата проведения'} value={date} onChange={(e) => {setDate(e.target.value)}}></MyDate>
      </Col>



      </Row>

      <MyTextArea placeholder={'ОПИШИТЕ ЗАДАЧУ'} value={description} onChange={(e) => {setDescription(e.target.value)}} style={{marginTop: 20 + 'px'}}></MyTextArea>


      <div className="form-tech-info"> ПОСЛЕ ПОЛУЧЕНИЯ ИНФОРМАЦИИ С ВАМИ СВЯЖЕТСЯ РУКОВОДИТЕЛЬ НАПРАВЛЕНИЯ ДЛЯ УТОЧНЕНИЯ ИНОФРМАЦИИ</div>

      <MyButton style={{marginTop: 20 + 'px'}} onClick={() => {sendMessage()}}>Создать</MyButton>



    </div>

  )
}


export default FormTech


