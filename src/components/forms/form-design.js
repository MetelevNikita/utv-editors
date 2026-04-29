// css

import './form.css'



import { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

// components

import MyButton from '../UI/MyButton'
import MySelect from '../UI/MySelect'
import MyTextArea from '../UI/MyTextArea'
import MyInput from '../UI/MyInput'
import MyDate from '../UI/MyDate'

// redux

import { useSelector } from 'react-redux'


// server

import designParts from '../../server/designParts'

// functions

import { getYGCompany } from '../functions/getYGCompany'
import { getYGKey } from '../functions/getYGKey'



const FormDesign = ({modalDesLike, modalDesDislike}) => {


  const { setModalActiveLike } = modalDesLike
  const { setModaActiveDislike } = modalDesDislike

  const [columnId, setColumnId] = useState('')
  const [YouGileKey, setYouGileKey] = useState('')
  const [customerSticker, setCustomerSticker] = useState([])
  const [prioritySticker, setPrioritySticker] = useState([])

   // user

  const users = useSelector(state => state.users.users)
  const email = sessionStorage.getItem('email')
  const singleUser = users.filter(user => user.email.toLowerCase() === email)[0]



  const [fio, setFio] = useState((singleUser) ? `${singleUser.name} ${singleUser.lastName}` : '')
  const [contacts, setContacts] = useState('')
  const [title, setTitle] = useState('')
  const [type, setType] = useState('')
  const [customer, setСustomer] = useState('')
  const [priority, setPriority] = useState('')
  const [requirements, setRequirements] = useState('')
  const [description, setDescription] = useState('')
  const [link, setLink] = useState('')
  const [packageProject, setPackageProject] = useState('')
  const [reference, setReference] = useState('')
  const [date, setDate] = useState('')


  const priorityStickerId = "1d3a9a91-0df6-4ade-b889-d05fb2327eb2"
  const customerStickerId = "0cd3d40a-b560-4aa2-b3b3-92728bfaeb08"
  const selectedPackageProject = () => (packageProject.length < 1) ? ['не выбрано'] : packageProject.map((item) => {return item.label})


  // timestamp

  const newDate = new Date(date)
  const timestamp = newDate.getTime()


  //

  useEffect(() => {

    getAllYougileData()

  }, [])
  
  
  const getAllYougileData = async () => {

    const companyId = await getYGCompany(2)
    const key = await getYGKey(companyId)
    setYouGileKey(key[0].key)

    await fetchDesk(key[0].key)
    await fetchGetStickers(key[0].key)


  }



  const fetchDesk = async (key) => {
    try {

      const controller = new AbortController()

      const response = await fetch('https://yougile.com/api-v2/columns', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${key}`
        },
        signal: controller.signal
      })

      if (!response.ok) {
        throw new Error(`HTTP error YOUGILE! status: ${response.status}`);
      }
      

      const data = await response.json()
      const currentId = data.content.find((item) => item.title === 'Входящие заявки')
      setColumnId(currentId.id)

    } catch (error) {
      console.error(`ОШИБКА - ${error}`)
    }
  }




  // getStickers

  const fetchGetStickers = async (key) => {

    try {

      const responce = await fetch('https://yougile.com/api-v2/string-stickers', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${key}`
        }
      })

      const data = await responce.json()
      setPrioritySticker(data.content[0].states.map((item) => {return {label: item.name, value: item.id, color: item.color}}))
      setCustomerSticker(data.content[1].states.map((item) => {return {label: item.name, value: item.id, color: item.color}}))

    } catch (error) {

      console.error(`ОШИБКА - ${error}`)

    }

  }


  const messageYG = `Автор:<br>${(singleUser) ? singleUser.name + ' ' + singleUser.lastName : fio}<br><br>Контакты заказчика:<br>${contacts}<br><br>Название проекта:<br>${title}<br><br>Важность проекта:<br>${priority.label}<br><br>Заказчик:<br>${customer.label}<br><br>Технические требования:<br>${requirements}<br><br>Описание:<br>${description}<br><br>Сылки на файлы:<br>${link}<br><br>Что требуется изготовить:<br>${selectedPackageProject().join(', ')}<br><br>Референсы:<br>${reference}<br><br>Дата сдачи проекта: ${date}`

  const messageTG = `Автор \n ${(singleUser) ? singleUser.name + ' ' + singleUser.lastName : fio} \n Контакты заказчика \n ${contacts} \n Название проекта \n ${title} \n Важность проекта \n ${priority.label} \n Заказчик \n ${customer.label} \n Технические требования \n ${requirements} \n Описание \n ${description} \n Сылки на файлы \n ${link} \n Что требуется изготовить \n ${selectedPackageProject().join(', ')} \n Референсы \n ${reference} \n Дата сдачи проекта \n ${date}`



  // fetchAddTask


  const fetchAddTask = async (key) => {

    try {
    const controller = new AbortController()
    const timeoutSignal = setTimeout(() => controller.abort(), 3000)

    const responce = await fetch('https://yougile.com/api-v2/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${key}`
        },
        body: JSON.stringify({title: title, columnId: columnId, description: messageYG, deadline: {deadline: timestamp}, stickers: {"1d3a9a91-0df6-4ade-b889-d05fb2327eb2": priority.value}}),
        signal: controller.signal
    })

    clearTimeout(timeoutSignal);

    const data = await responce.json()
    return data

    } catch (error) {
      console.error(`ОШИБКА - ${error}`)
    }

  }

  // send to Telegram

  const sendToTelegram = async () => {

    const controller = new AbortController()
    const timeoutSignal = setTimeout(() => controller.abort(), 3000)

    const TOKEN = '6953905275:AAGor-AkqyqG9-RyE6oagsh_Jpl3XnaEeGg'
    const CHAT_ID = '-1002092523389'
    const URL_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`


    try {

      const responce = await fetch(URL_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({chat_id: CHAT_ID, text: messageTG}),
        signal: controller.signal
      })

      if (!responce.ok) {
        throw new Error(`HTTP error TELEGRAM! status: ${responce.status}`)
      }

      clearInterval(timeoutSignal)

      const data = responce.json()
      return data

    } catch (error) {
      console.error(`ОШИБКА - ${error}`)
    }
  }


  const sendMessage = async () => {

    if (fio !== '' && contacts !== '' && title !== '' && priority !== '' && customer !== '' && requirements !== '' && description !== '' && link !== '' && packageProject !== '' && reference !== '' && date !== '') {

      await fetchAddTask(YouGileKey)
      await sendToTelegram()

      setFio('')
      setContacts('')
      setTitle('')
      setType('')
      setСustomer('')
      setRequirements('')
      setDescription('')
      setLink('')
      setPackageProject('')
      setReference('')
      setDate('')


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



      <Col md={12} sm={12} xs={12} className='mt-3'><MyInput value={fio} onChange={(e) => {setFio(e.target.value)}} placeholder={'фио'} style={{width: '100%'}}></MyInput></Col>


      <Col md={12} sm={12} xs={12} className='mt-3'><MyInput style={{width: '100%'}}  placeholder={'контакная информация заказчика'} value={contacts} onChange={(e) => {setContacts(e.target.value)}}></MyInput></Col>
      <Col md={12} sm={12} xs={12} className='mt-3'><MyInput style={{width: '100%'}} placeholder={'название проекта'} value={title} onChange={(e) => {setTitle(e.target.value)}}></MyInput></Col>


      <Col md={12} sm={12} xs={12} className='d-flex justify-content-md-between justify-content-center align-items-center flex-md-row flex-column'>

        <Col md={6} sm={12} xs={12} className='mt-3'>
        <MySelect placeholder={'заказчик'} name="colors" styles={{control: (baseStyles) => ({...baseStyles, paddingLeft: 10 + 'px' , minHeight: 61 + 'px' , borderRadius: 10 + 'px', width: '98%'})}} options={customerSticker} value={customer} onChange={setСustomer}></MySelect>
        </Col>


        <Col md={6} sm={12} xs={12} className='mt-3'>
        <MySelect placeholder={'важность проекта'} name="colors" styles={{control: (baseStyles) => ({...baseStyles, paddingLeft: 10 + 'px' , minHeight: 61 + 'px' , borderRadius: 10 + 'px', width: '98%'})}} options={prioritySticker} value={priority} onChange={setPriority}></MySelect>
        </Col>

      </Col>


      <Col md={12} sm={12} xs={12} className='mt-3'><MyInput style={{width: '100%'}} placeholder={'технические требования (формат, разрешеение и т.д.)'} value={requirements} onChange={(e) => {setRequirements(e.target.value)}}></MyInput></Col>

      <Col md={12} sm={12} xs={12} className='mt-3'><MyTextArea placeholder={'краткое описание проекта'} value={description} onChange={(e) => {setDescription(e.target.value)}}></MyTextArea></Col>
      <Col md={12} sm={12} xs={12} className='mt-2'><MyTextArea placeholder={'ссылки на файлы'} value={link} onChange={(e) => {setLink(e.target.value)}}></MyTextArea></Col>



      <Col md={12} sm={12} xs={12} className='mt-2'><MySelect placeholder={'из чего состоит проект'} isMulti closeMenuOnSelect={false} value={packageProject} onChange={setPackageProject} styles={{control: (baseStyles) => ({...baseStyles, paddingLeft: 10 + 'px' , minHeight: 61 + 'px' , borderRadius: 10 + 'px'})}}  options={designParts}></MySelect></Col>

      <Col md={12} sm={12} xs={12} className='mt-3'><MyInput style={{width: '100%'}} placeholder={'пожелания референсы'} value={reference} onChange={(e) => {setReference(e.target.value)}}></MyInput></Col>


      <Col md={12} sm={12} xs={12} className='mt-3'>
        <div style={{width: '100%', textAlign: 'center'}}>рекомендуемая дата сдачи проекта</div>
        <Col className='mt-2'><MyDate style={{width: '100%'}} placeholder={'дата сдачи проекта'} value={date} onChange={(e) => {setDate(e.target.value)}}></MyDate></Col>
      </Col>


      <Row className='mt-4 d-flex justify-content-center align-items-center'>
        <Col md={6} sm={12} xs={12} className='d-flex justify-content-center align-items-center mt-2'>
          <MyButton style={{width: 300 + 'px'}} onClick={() => {sendMessage()}}>Создать</MyButton>
        </Col>


        <Col md={6} sm={12} xs={12} className='d-flex justify-content-center align-items-center mt-2'>
        <Link to={'main'}><MyButton style={{width: 300 + 'px'}}>Назад</MyButton></Link>
        </Col>
      </Row>



    </Col>

  )
}

export default FormDesign