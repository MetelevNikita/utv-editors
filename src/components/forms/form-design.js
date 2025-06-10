// css

import './form.css'

//

import { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Select from 'react-select'

// components

import MyButton from '../UI/MyButton'
import MySelect from '../UI/MySelect'
import MyTextArea from '../UI/MyTextArea'
import MyInput from '../UI/MyInput'
import MyDate from '../UI/MyDate'


// server

import designParts from '../../server/designParts'



const FormDesign = ({modalDesLike, modalDesDislike}) => {

  const {modalActiveLike, setModalActiveLike} = modalDesLike
  const {modalActiveDislike, setModaActiveDislike} = modalDesDislike

  const [columnId, setColumnId] = useState('')
  const [customerSticker, setCustomerSticker] = useState([])
  const [prioritySticker, setPrioritySticker] = useState([])



  const [name, setName] = useState('')
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

  const [test, setTest] = useState('')


  const priorityStickerId = "1d3a9a91-0df6-4ade-b889-d05fb2327eb2"
  const customerStickerId = "0cd3d40a-b560-4aa2-b3b3-92728bfaeb08"
  const selectedPackageProject = () => (packageProject.length < 1) ? ['не выбрано'] : packageProject.map((item) => {return item.label})


  // timestamp

  const newDate = new Date(date)
  const timestamp = newDate.getTime()



  // fetchIdKey


  const fetchIdKey = () => {

    fetch('https://yougile.com/api-v2/auth/companies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({login: 'Kyle.B@mail.ru', password: 'Metelev1989'})
    }).then(responce => responce.json())
      .then(data => {
        return fetch('https://yougile.com/api-v2/auth/keys/get', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({login: 'Kyle.B@mail.ru', password: 'Metelev1989', companyId: data.content[2].id})
        }).then(responce => responce.json())
          .then(data => {
            localStorage.setItem('keyDes', data[0].key)

          })

        })
    }



    const fetchDesk = () => {
      const keyDes = localStorage.getItem('keyDes')
      fetch('https://yougile.com/api-v2/columns', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${keyDes}`
        }
      }).then(responce => responce.json())
        .then(data => {
          setColumnId(data.content[6].id)
        })
    }



    // getStickers

    const fetchGetStickers = () => {
      const keyDes = localStorage.getItem('keyDes')
      fetch('https://yougile.com/api-v2/string-stickers', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${keyDes}`
        }
      }).then(responce => responce.json())
        .then(data => {
          setPrioritySticker(data.content[0].states.map((item) => {
            return {label: item.name, value: item.id, color: item.color}
          })
      )
          setCustomerSticker(data.content[1].states.map((item) => {
            return {label: item.name, value: item.id, color: item.color}
          })
      )
        })
        .catch(error => console.log(error, "ERROR"))
    }



    const messageYG = `Автор:<br>${name}<br><br>Контакты заказчика:<br>${contacts}<br><br>Название проекта:<br>${title}<br><br>Важность проекта:<br>${priority.label}<br><br>Заказчик:<br>${customer.label}<br><br>Технические требования:<br>${requirements}<br><br>Описание:<br>${description}<br><br>Сылки на файлы:<br>${link}<br><br>Что требуется изготовить:<br>${selectedPackageProject().join(', ')}<br><br>Референсы:<br>${reference}<br><br>Дата сдачи проекта: ${date}`

    const messageTG = ` Автор \n ${name} \n Контакты заказчика \n ${contacts} \n Название проекта \n ${title} \n Важность проекта \n ${priority.label} \n Заказчик \n ${customer.label} \n Технические требования \n ${requirements} \n Описание \n ${description} \n Сылки на файлы \n ${link} \n Что требуется изготовить \n ${selectedPackageProject().join(', ')} \n Референсы \n ${reference} \n Дата сдачи проекта \n ${date}`



    // fetchAddTask


    const fetchAddTask = () => {
      const keyDes = localStorage.getItem('keyDes')
      fetch('https://yougile.com/api-v2/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${keyDes}`
          },
          body: JSON.stringify({title: title, columnId: columnId, description: messageYG, deadline: {deadline: timestamp}, stickers: {"1d3a9a91-0df6-4ade-b889-d05fb2327eb2": priority.value}})
      })
      .catch(error => console.log(error, 'ERROR'))
    }





    // send to Telegram

    const sendToTelegram = () => {


      const TOKEN = '6953905275:AAGor-AkqyqG9-RyE6oagsh_Jpl3XnaEeGg'
      const CHAT_ID = '-1002092523389'
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

      if (name !== '' && contacts !== '' && title !== '' && priority !== '' && customer !== '' && requirements !== '' && description !== '' && link !== '' && packageProject !== '' && reference !== '' && date !== '') {



        fetchAddTask()
        sendToTelegram()


        setName('')
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



    useEffect(() => {
      fetchIdKey()

      setTimeout(() => {
        fetchDesk()
        fetchGetStickers()
      }, 5000)

    }, [])




  return(


    <Col style={{marginLeft: '10px', marginRight: '10px'}}>

      <Col md={12} sm={12} xs={12} className='mt-3'><MyInput style={{width: '100%'}} placeholder={'фио'} value={name} onChange={(e) => {setName(e.target.value)}}></MyInput></Col>
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