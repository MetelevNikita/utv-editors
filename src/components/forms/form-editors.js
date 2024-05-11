import './form.css'
import { Container, Col, Row } from "react-bootstrap"
import app from '../../firebaseApp'


// redux


import { useSelector } from 'react-redux'


// components

import MyInput from "../UI/MyInput"
import MySelect from "../UI/MySelect"
import MyButton from "../UI/MyButton"
import MyTextArea from "../UI/MyTextArea"
import MyDate from "../UI/MyDate"


// server


import userPrice from "../../server/userPrice"
import usersList from "../../server/usersList"
import programType from "../../server/programType"
import programCotegory from '../../server/programCotegory'
import sampleProject from '../../server/sampleProject'


//

import { useState, useEffect } from "react"


const FormEditors = ({modalLike, modalDisLike}) => {



const users = useSelector(state => state.users.users)
const email = sessionStorage.getItem('email')
const singleUser = users.filter(user => user.email.toLowerCase() === email)[0]


const {modalActiveLike, setModalActiveLike} = modalLike
const {modalActiveDislike, setModaActiveDislike} = modalDisLike


// auth

const [user, setUser] = useState('')
const [colums, setColums] = useState('')
const [selectedOption, setSelectionOption] = useState('')


//


const [fio, setFio] = useState('')
const [title, setTitle] = useState('')
const [sale, setSale] = useState('')
const [coordination, setCoordination] = useState('')
const [audience, setAudience] = useState('')
const [description, setDescription] = useState('')
const [link, setLink] = useState('')
const [time, setTime] = useState('')
const [info, setInfo] = useState('')
const [referense, setReferense] = useState('')
const [date, setDate] = useState('')
const [destanation, setDestanation] = useState('')
const [price, setPrice] = useState('')
const [category, setCategory] = useState('')
const [sample, setSample] = useState('')

//

const [newMessageTG, setNewMessageTg] = useState('')
const [newMessageYG, setNewMessageYG] = useState('')



//

const newDate = new Date(date)
const timestamp = newDate.getTime()

      //


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
          "Content-Type": "application/json"
        },
        body: JSON.stringify({login: 'Kyle.B@mail.ru', password: 'Metelev1989', companyId: data.content[1].id})
      }).then(responce => responce.json())
        .then(data => {
          return localStorage.setItem('key', data[0].key)})
    })

}

const userKey = localStorage.getItem('key')


// получаем colums

const fetchDesk = async () => {
  const userKey = localStorage.getItem('key')
  const res = await fetch('https://yougile.com/api-v2/columns?limit=100', {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${userKey}`
    },
  })

  const data = await res.json()
  return setColums(data)

}


// получаем пользователей

const fetchUser = async () => {
  const userKey = localStorage.getItem('key')
  const res = await fetch('https://yougile.com/api-v2/boards', {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${userKey}`
    }
  })

  const data = await res.json()
  return setUser(data)
}


const getList = () => {
  fetchIdKey()

  setTimeout(() => {
    fetchDesk()
    fetchUser()
  }, 5000)

}

useEffect(() => {getList()}, [])



// message send

  const sendNewMessageCard = () => {


    let messageTG = ''
    let messageYG = ''

    if(category.value === 'типовой проект') {

      messageYG = `${category.label} ФИО АВТОРА: ${(singleUser) ? singleUser.name + singleUser.lastName : fio} НАЗВАНИЕ ПРОЕКТА: ${title} ТИП ПРОЕКТА: ${sale.label} \n СОГЛАСОВАТЕЛЬ: ${coordination} ОПИСАНИЕ: ${description} ССЫЛКИ или ПУТЬ ДО ФАЙЛОВ: ${link} МАТЕРИАЛЫ К ПРОЕКТУ: ${info} ХРОНОМЕТРАЖ: ${time} НАПРАВЛЕНИЕ: ${price.label} ИСПОЛНИТЕЛЬ: ${selectedOption.label} СРОКИ: ${date}`

      messageTG = `${category.label}\n\nФИО АВТОРА:\n${(singleUser) ? singleUser.name + singleUser.lastName : fio}\nНАЗВАНИЕ ПРОЕКТА:\n${title} ТИП ПРОЕКТА:\n${sale.label}\nСОГЛАСОВАТЕЛЬ:\n${coordination} \nОПИСАНИЕ:\n${description}\nССЫЛКИ или ПУТЬ ДО ФАЙЛОВ:\n${link}\nМАТЕРИАЛЫ К ПРОЕКТУ:\n${info}\nХРОНОМЕТРАЖ:\n${time}\nНАПРАВЛЕНИЕ:\n${price.label}\nИСПОЛНИТЕЛЬ:\n${selectedOption.label}\nСРОКИ:\n${date}`

      return sendCard(messageTG, messageYG)


    } else if (category.value === 'новый проект') {

      messageYG = `${category.label}  ФИО АВТОРА: ${(singleUser) ? singleUser.name + singleUser.lastName : fio} НАЗВАНИЕ ПРОЕКТА: ${title} ТИП ПРОЕКТА: ${sale.label} \n СОГЛАСОВАТЕЛЬ: ${coordination} ЦЕЛЕВАЯ АУДИТОРИЯ: ${audience} ОПИСАНИЕ: ${description} ССЫЛКИ или ПУТЬ ДО ФАЙЛОВ: ${link} МАТЕРИАЛЫ К ПРОЕКТУ: ${info} ССЫЛКИ НА ПРИМЕР: ${referense} ХРОНОМЕТРАЖ: ${time} НАПРАВЛЕНИЕ: ${price.label} ГДЕ БУДЕТ РАЗМЕЩЕН ПРОДУКТ: ${destanation} ВЫБЕРИТЕ ИСПОЛНИТЕЛЯ: ${selectedOption.label} СРОКИ: ${date}`

      messageTG = `${category.label}\n\nФИО АВТОРА: ${(singleUser) ? singleUser.name + singleUser.lastName : fio}\nНАЗВАНИЕ ПРОЕКТА: ${title}\nТИП ПРОЕКТА: ${sale.label}\nСОГЛАСОВАТЕЛЬ: ${coordination} ЦЕЛЕВАЯ АУДИТОРИЯ: ${audience}\nОПИСАНИЕ: ${description} ССЫЛКИ или ПУТЬ ДО ФАЙЛОВ: ${link}\nМАТЕРИАЛЫ К ПРОЕКТУ: ${info}\nССЫЛКИ НА ПРИМЕР: ${referense}\nХРОНОМЕТРАЖ: ${time}\nНАПРАВЛЕНИЕ: ${price.label} ГДЕ БУДЕТ РАЗМЕЩЕН ПРОДУКТ: ${destanation}\nИСПОЛНИТЕЛЬ: ${selectedOption.label} СРОКИ: ${date}`

      return sendCard(messageTG, messageYG)


    } else if (category.value === 'шаблонный проект') {

      messageYG = `${category.label} ФИО АВТОРА: ${(singleUser) ? singleUser.name + singleUser.lastName : fio} НАЗВАНИЕ ПРОЕКТА: ${sample.label} ПУТЬ К СЫРЬЮ: ${sample.path} ОПИСАНИЕ: ${description} ИСПОЛНИТЕЛЬ: ${selectedOption.label} СРОКИ: ${date}`

      messageTG = `${category.label}\n\nФИО АВТОРА:\n${(singleUser) ? singleUser.name + singleUser.lastName : fio}\nНАЗВАНИЕ ПРОЕКТА:\n${sample.label}\nПУТЬ К СЫРЬЮ:\n${sample.path}\nОПИСАНИЕ:\n${description}\nИСПОЛНИТЕЛЬ: ${selectedOption.label}\nСРОКИ: ${date}`

      return sendCard(messageTG, messageYG)

    }
  }

//









const sendToTelegram = (newMessageTG) => {

const TOKEN = '6953905275:AAGor-AkqyqG9-RyE6oagsh_Jpl3XnaEeGg'
const CHAT_ID = '-1002013845900'
const URL_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`



fetch(URL_API, {
method: 'POST',
headers: {
  'Content-Type': 'application/json'
},
body: JSON.stringify({chat_id: CHAT_ID, text: newMessageTG})



}).then(responce => responce.json())
.then(data => console.log(data))
.catch(error => console.log(error, 'ERROR'))


if (selectedOption.tgId === "") {
  return
} else {
  fetch(URL_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({chat_id: selectedOption.tgId, text: newMessageTG})



    }).then(responce => responce.json())
    .then(data => console.log(data))
    .catch(error => console.log(error, 'ERROR'))
}

}


const sendCard = (newMessageTG, newMessageYG) => {
  const userKey = localStorage.getItem('key')

  if (fio === '' && title === '' &&  link === '' && time === '' && info === ''  && date === ''  && description === '', selectedOption === '') {

      setModaActiveDislike(true)
      return

  }


  fetch('https://yougile.com/api-v2/tasks', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${userKey}`
    },
    body: JSON.stringify({title: (category.label === 'шаблонный проект') ? sample.label : title, columnId: selectedOption.value, deadline: {deadline: timestamp}, description: JSON.stringify(newMessageYG)})
  }).then(responce => responce.json())
    .then(data => console.log(data))
    .catch(error => console.log(error, 'ERROR'))


  sendToTelegram(newMessageTG)

  setFio('')
  setTitle('')
  setSale('тип проекта')
  setCoordination('')
  setSelectionOption('выберите исполнителя')
  setAudience('')
  setDescription('')
  setLink('')
  setTime('')
  setInfo('')
  setReferense('')
  setDate('')
  setDestanation('')
  setSample('проект')

  setModalActiveLike(true)
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });



}


//


const undefinedProject = () => {

  return(

      <Col md={12} sm={12} xs={12} className='mt-3'><MySelect styles={{control: (styles) => {return {...styles, width: '100%', height: 61 + 'px', borderRadius: 10 + 'px',  marginBottom: 1 + 'px', paddingLeft: 10 + 'px'}}}} options={programCotegory} placeholder={'категория'} onChange={setCategory}></MySelect></Col>


  )
}


const newProject = () => {



  return(
    <Col className='d-flex justify-content-center align-items-center mt-3 flex-column'>


      {(singleUser) ? <Col md={12} sm={12} xs={12} className='mt-1'><MyInput disabled={true} value={`${singleUser.name} ${singleUser.lastName}`} onChange={(e) => {setFio(e.target.value)}} placeholder={'фио'} style={{width: '100%'}}></MyInput></Col> : <Col md={12} sm={12} xs={12} className='mt-3'><MyInput value={fio} onChange={(e) => {setFio(e.target.value)}} placeholder={'фио'} style={{width: '100%'}}></MyInput></Col>}

      <Col className='mt-2' md={12} sm={12} xs={12}><MyInput style={{width: '100%'}} value={title} onChange={(e) => {setTitle(e.target.value)}} placeholder={'название проекта'}></MyInput></Col>


      <Col md={12} sm={12} xs={12} className='d-flex justify-content-md-between justify-content-center align-items-center flex-md-row flex-column'>

          <Col className='mt-2' md={6} xs={12}><MySelect styles={{control: (styles) => {return {...styles, width: '98%', height: 61 + 'px', borderRadius: 10 + 'px',  paddingLeft: 10 + 'px'}}}} options={programType} placeholder={'тип проекта'} onChange={setSale}></MySelect></Col>

          <Col className='mt-2' md={6} xs={12}><MyInput value={coordination} onChange={(e) => {setCoordination(e.target.value)}} style={{width: '98%'}} placeholder={'кем согласован проект'}></MyInput></Col>

      </Col>


      <Col className='mt-2' md={12} sm={12} xs={12}><MyInput title={'кто ЦА проекта?'} value={audience} onChange={(e) => {setAudience(e.target.value)}} placeholder={'целевая аудитория'} style={{width: '100%'}}></MyInput></Col>

      <Col md={12} xs={12} className='mt-2'><MyTextArea placeholder={'краткое описание проекта'} value={description} onChange={(e) => {setDescription(e.target.value)}} style={{width: '100%', paddingRight: '10px', paddingLeft: '10px'}}></MyTextArea></Col>

      <Col className='mt-2' md={12} sm={12} xs={12} ><MyInput value={link} onChange={(e) => {setLink(e.target.value)}} placeholder={'ссылки на файлы, которые нужно приложить, архив:'} style={{width: '100%'}}></MyInput></Col>



      <Col md={12} sm={12} xs={12} className='d-flex justify-content-between align-items-center mt-2 flex-md-row flex-column'>

        <Col className='mt-2' md={6} sm={12} xs={12}><MyInput value={info} onChange={(e) => {setInfo(e.target.value)}} placeholder={'сценарный план + закадровый текст(ссылку на файл)'} style={{width: '98%'}}></MyInput></Col>

        <Col className='mt-2' md={6} sm={12} xs={12}><MyInput value={referense} onChange={(e) => {setReferense(e.target.value)}} placeholder={'пожелания, референсы (динамика, подача, ритм, музыка)'} style={{width: '98%'}}></MyInput></Col>

      </Col>




      <Col md={12} sm={12} xs={12} className='d-flex justify-content-between align-items-center mt-2 flex-md-row flex-column'>

          <Col className='mt-2' md={6} sm={12} xs={12}><MyInput value={time} onChange={(e) => {setTime(e.target.value)}} style={{width: '98%'}} placeholder={'хронометраж'}></MyInput></Col>

          <Col className='mt-2' md={6} sm={12} xs={12}><MySelect styles={{control: (styles) => {return {...styles, width: '98%', height: 61 + 'px', borderRadius: 10 + 'px',  paddingLeft: 10 + 'px'}}}} options={userPrice} value={price} onChange={setPrice} placeholder={'проект'}></MySelect></Col>

      </Col>


      <Col md={12} sm={12} xs={12} className='mt-2'><MyInput value={destanation} onChange={(e) => {setDestanation(e.target.value)}} placeholder={'площадка размещения ролика'} style={{width: '100%'}}></MyInput></Col>


      <Col md={12} sm={12} xs={12} className='d-flex justify-content-between align-items-center mt-2 flex-md-row flex-column'>

          <Col md={6} sm={12} xs={12} className='mt-2'>
            <div className='form-deadline'>выберите исполнителя</div>
            <Col md={12} sm={12} xs={12}><MySelect styles={{control: (styles) => {return {...styles, width: '100%' ,height: 61 + 'px', borderRadius: 10 + 'px',  paddingLeft: 10 + 'px'}}}} options={usersList} placeholder={'исполнитель'} onChange={setSelectionOption}></MySelect></Col>

            </Col>


            <Col md={6} sm={12} xs={12} className='mt-2'>
            <div className='form-deadline'>рекомендуемая дата сдачи проекта</div>
            <Col><MyDate style={{width: '98%'}} date={'Выберите дату'} placeholder={'введите дату'} value={date} onChange={(e) => {setDate(e.target.value)}}></MyDate></Col>
            </Col>

      </Col>

      </Col>
  )
}


const typeProject = () => {



  return(
    <Col>


      {(singleUser) ? <Col md={12} sm={12} xs={12} className='mt-3'><MyInput disabled={true} value={`${singleUser.name} ${singleUser.lastName}`} onChange={(e) => {setFio(e.target.value)}} placeholder={'фио'} style={{width: '100%'}}></MyInput></Col> : <Col md={12} sm={12} xs={12} className='mt-3'><MyInput value={fio} onChange={(e) => {setFio(e.target.value)}} placeholder={'фио'} style={{width: '100%'}}></MyInput></Col>}

      <Col md={12} sm={12} xs={12} className='mt-2'><MyInput value={title} onChange={(e) => {setTitle(e.target.value)}} placeholder={'название проекта'} style={{width: '100%'}}></MyInput></Col>

      <Col className='d-flex justify-content-md-between justify-content-center align-items-center flex-md-row flex-column'>

          <Col md={6} sm={12} xs={12} className='mt-2'>
              <MySelect styles={{control: (styles) => {return {...styles, width: '98%', height: 61 + 'px', borderRadius: 10 + 'px', paddingLeft: 10 + 'px', marginBottom: 1 + 'px'}}}} options={programType} placeholder={'тип проекта'} onChange={setSale}></MySelect>
          </Col>

          <Col md={6} sm={12} xs={12} className='mt-2'>
              <MyInput value={coordination} onChange={(e) => {setCoordination(e.target.value)}} style={{width: '98%'}} placeholder={'кем согласован проект'}></MyInput>
          </Col>

        </Col>


      <Col md={12} sm={12} xs={12} className='mt-2'><MyTextArea placeholder={'краткое описание проекта'} value={description} onChange={(e) => {setDescription(e.target.value)}}></MyTextArea></Col>

      <Col md={12} sm={12} xs={12} className='mt-2'><MyInput value={link} onChange={(e) => {setLink(e.target.value)}} placeholder={'ссылки на файлы, которые нужно приложить, архив:'} style={{width: '100%'}}></MyInput></Col>

      <Col md={12} sm={12} xs={12} className='mt-2'><MyInput value={info} onChange={(e) => {setInfo(e.target.value)}} placeholder={'сценарный план + закадровый текст(ссылку на файл)'} style={{width: '100%'}}></MyInput></Col>




      <Col className='d-flex justify-content-md-between justify-content-center align-items-center flex-md-row flex-column'>
        <Col md={6} sm={12} xs={12} className='mt-2'>
            <MyInput value={time} onChange={(e) => {setTime(e.target.value)}} style={{marginTop: 2 + 'px', width: '98%'}} placeholder={'хронометраж'}></MyInput>
        </Col>


        <Col md={6} sm={12} xs={12} className='mt-2'>
            <MySelect styles={{control: (styles) => {return {...styles, width: '98%', height: 61 + 'px', borderRadius: 10 + 'px',  marginBottom: 1 + 'px', paddingLeft: 10 + 'px'}}}} options={userPrice} onChange={setPrice} placeholder={'проект'}></MySelect>
        </Col>
      </Col>


      <Col md={12} sm={12} xs={12} className='d-flex justify-content-md-between justify-content-center align-items-center flex-md-row flex-column'>

        <Col md={6} sm={12} xs={12} className='mt-3'>
        <div className='form-deadline'>выберите исполнителя</div>
        <Col><MySelect styles={{control: (styles) => {return {...styles, width: '100%' ,height: 61 + 'px', borderRadius: 10 + 'px',  marginBottom: 1 + 'px', paddingLeft: 10 + 'px'}}}} options={usersList} placeholder={'исполнитель'} onChange={setSelectionOption}></MySelect></Col>
        </Col>


        <Col md={6} sm={12} xs={12} className='mt-3'>
        <div className='form-deadline'>рекомендуемая дата сдачи проекта</div>
        <Col><MyDate style={{width: '100%'}} date={'Выберите дату'} placeholder={'введите дату'} value={date} onChange={(e) => {setDate(e.target.value)}}></MyDate></Col>

        </Col>

      </Col>


      </Col>
  )
}


const masterProject = () => {


  return (
    <Col md={12} sm={12} xs={12}>


          {(singleUser) ? <Col md={12} sm={12} xs={12} className='mt-3'><MyInput disabled={true} value={`${singleUser.name} ${singleUser.lastName}`} onChange={(e) => {setFio(e.target.value)}} placeholder={'фио'} style={{width: '100%'}}></MyInput></Col> : <Col md={12} sm={12} xs={12} className='mt-3'><MyInput value={fio} onChange={(e) => {setFio(e.target.value)}} placeholder={'фио'} style={{width: '100%'}}></MyInput></Col>}

          <Col md={12} sm={12} xs={12} className='mt-3'><MySelect styles={{control: (styles) => {return {...styles, width: '100%', height: 61 + 'px', borderRadius: 10 + 'px',  marginBottom: 1 + 'px', paddingLeft: 10 + 'px'}}}} options={sampleProject} placeholder={'проект'} onChange={setSample}></MySelect></Col>

          <Col md={12} sm={12} xs={12} className='mt-3'><MyTextArea placeholder={'краткое описание проекта'} value={description} onChange={(e) => {setDescription(e.target.value)}}></MyTextArea></Col>


          <Col md={12} sm={12} xs={12} className='d-flex justify-content-md-between justify-content-center align-items-center flex-md-row flex-column'>

            <Col md={6} sm={12} xs={12} className='mt-3'>
            <div className='form-deadline'>выберите исполнителя</div>
            <Col><MySelect styles={{control: (styles) => {return {...styles, width: '100%' ,height: 61 + 'px', borderRadius: 10 + 'px',  marginBottom: 1 + 'px', paddingLeft: 10 + 'px'}}}} options={usersList} placeholder={'исполнитель'} onChange={setSelectionOption}></MySelect></Col>
            </Col>


            <Col md={6} sm={12} xs={12} className='mt-3'>
            <div className='form-deadline'>рекомендуемая дата сдачи проекта</div>
            <Col><MyDate style={{width: '100%'}} date={'Выберите дату'} placeholder={'введите дату'} value={date} onChange={(e) => {setDate(e.target.value)}}></MyDate></Col>

            </Col>

          </Col>

    </Col>

  )

}



//



  return (

    <Col style={{marginLeft: '10px', marginRight: '10px'}}>

      {undefinedProject()}
      {(category.label === 'типовой проект') ? typeProject({category, setCategory}) : <></>}
      {(category.label === 'новый проект') ? newProject({category, setCategory}) : <></>}
      {(category.label === 'шаблонный проект') ? masterProject({category, setCategory}) : <></>}

      <MyButton style={{marginTop: 20 + 'px'}} onClick={() => {sendNewMessageCard()}}>Создать</MyButton>

    </Col>

  )
}

export default FormEditors