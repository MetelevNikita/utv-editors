import './form.css'
import { useEffect, useState, useContext } from 'react'
import { Container, Col, Row } from 'react-bootstrap'


// components


import MyInput from '../UI/MyInput'
import MyTextArea from '../UI/MyTextArea'
import MyDate from '../UI/MyDate'
import MySelect from '../UI/MySelect'
import MyButton from '../UI/MyButton'

// redux

import { useSelector } from 'react-redux'

// server

import streamType from '../../server/streamType'


// function

import { getYGCompany } from '../functions/getYGCompany'
import { getYGKey } from '../functions/getYGKey'

// 


const FormTech = ({modalTechLike, modalTechDislike}) => {


  const {modalActiveLike, setModalActiveLike} = modalTechLike
  const {modalActiveDislike, setModaActiveDislike} = modalTechDislike



  const [YouGileKey, setYouGileKey] = useState('')

  // 

  const users = useSelector(state => state.users.users)
  const email = sessionStorage.getItem('email')
  const singleUser = users.filter(user => user.email.toLowerCase() === email)[0]


  // 


  const [fio, setFio] = useState((singleUser) ? `${singleUser.name} ${singleUser.lastName}` : '')
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





  useEffect(() => {

    getAllYougileData()

  }, [])


  const getAllYougileData = async () => {

    const companyId = await getYGCompany(0)
    const key = await getYGKey(companyId)
    setYouGileKey(key[0].key)

    await fetchDesk(key[0].key)


  }



  const fetchDesk = async (keyTech) => {


    try {
      const responce = await fetch(process.env.REACT_APP_YG_COLUMS, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${keyTech}`
        }
      })


      if (!responce.ok) {
        alert(`Ошибка при получении столбцов из YouGile: ${responce.status} - попробуйте позже`)
        throw new Error(`Ошибка при получении столбцов из YouGile: ${responce.status}`)
      } 

      const data = await responce.json()
      setColumnId(data.content[1].id)

    } catch (error) {
      console.log(error) 
    }

  }


  const messageYG = ` ФИО АВТОРА:<br>${(singleUser) ? singleUser.name + ' ' + singleUser.lastName : fio}<br><br>ТЕЛЕФОН ДЛЯ СВЯЗИ:<br>${phone}<br><br>ТИП ПРОЕКТА:<br>${type.label}<br><br>ОПИСАНИЕ:<br>${description}<br><br>СРОКИ:<br>${date}<br><br>ОПИСАНИЕ<br>${description}`
  const messageTG = ` ФИО АВТОРА: \n ${(singleUser) ? singleUser.name + ' ' + singleUser.lastName : fio} \n НАЗВАНИЕ ПРОЕКТА: \n ${title} \n ТЕЛЕФОН ДЛЯ СВЯЗИ: \n ${phone} \n ТИП ПРОЕКТА: \n ${type.label} \n ОПИСАНИЕ: \n ${description} \n СРОКИ: \n ${date} \n ОПИСАНИЕ: \n ${description}`


  const fetchAddTask = async () => {


    try {

      const responce = await fetch(process.env.REACT_APP_YG_TASK, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${YouGileKey}`
        },
        body: JSON.stringify({title: title, columnId: columnId, description: messageYG, deadline: {deadline: timestamp}})
      })

      if (!responce.ok) {
        alert(`Ошибка при добавлении таска в YouGile: ${responce.status} - попробуйте позже`)
        throw new Error(`Ошибка при добавлении таска в YouGile: ${responce.status}`)
      }
      
    } catch (error) {
      console.log(error)
    }
  }


  // send to TG


  const sendToTelegram = async () => {

    try {

      const CHAT_ID = '-1002046063150'
      const URL_API = `https://api.telegram.org/bot${process.env.REACT_APP_TG_TOKEN}/sendMessage`

      const responce = await fetch(URL_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({chat_id: CHAT_ID, text: messageTG})
      })

      if (!responce.ok) {
        alert(`Ошибка при отправке сообщения в Телеграм Бот: ${responce.status} - попробуйте позже`)
        throw new Error(`Ошибка при отправке сообщения в Телеграм Бот: ${responce.status}`)
      }
      
    } catch (error) {
      console.log(error)
      
    }

  }



  const sendMessage = async () => {

    if (fio !== '' && title !== '' && phone !== '' && place !== '' && description !== '') {

    await fetchAddTask()
    await sendToTelegram()

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







  return(


    <Col style={{marginLeft: '10px', marginRight: '10px'}}>


      {(singleUser) ? <Col md={12} sm={12} xs={12} className='mt-1'><MyInput disabled={true} value={`${singleUser.name} ${singleUser.lastName}`} onChange={(e) => {setFio(e.target.value)}} placeholder={'фио'} style={{width: '100%'}}></MyInput></Col> : <Col md={12} sm={12} xs={12} className='mt-3'><MyInput value={fio} onChange={(e) => {setFio(e.target.value)}} placeholder={'фио'} style={{width: '100%'}}></MyInput></Col>}


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


