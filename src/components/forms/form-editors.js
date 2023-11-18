import './form.css'
import { Container, Col, Row } from "react-bootstrap"
import app from '../../firebaseApp'


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


//

import { useState, useEffect } from "react"


const FormEditors = ({modalLike, modalDisLike}) => {


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
            console.log(data)
            return fetch('https://yougile.com/api-v2/auth/keys/get', {
              method: 'POST',
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({login: 'Kyle.B@mail.ru', password: 'Metelev1989', companyId: data.content[1].id})
            }).then(responce => responce.json())
              .then(data => {
                console.log(data)
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
        console.log(data)
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
        console.log(data)
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



      // message


      const messageYG = ` ФИО АВТОРА: ${fio} НАЗВАНИЕ ПРОЕКТА: ${title} ТИП ПРОЕКТА: ${sale.label} \n СОГЛАСОВАТЕЛЬ: ${coordination} ЦЕЛЕВАЯ АУДИТОРИЯ: ${audience} ОПИСАНИЕ: ${description} ССЫЛКИ или ПУТЬ ДО ФАЙЛОВ: ${link} МАТЕРИАЛЫ К ПРОЕКТУ: ${info} ССЫЛКИ НА ПРИМЕР: ${referense} ХРОНОМЕТРАЖ: ${time} СТАВКА ПРОЕКТА: ${price.label} ${price.value} ГДЕ БУДЕТ РАЗМЕЩЕН ПРОДУКТ: ${destanation} ВЫБЕРИТЕ ИСПОЛНИТЕЛЯ: ${selectedOption.label} СРОКИ: ${date}`

      const messageTG = ` ФИО АВТОРА \n ${fio} \n НАЗВАНИЕ ПРОЕКТА \n ${title} \n ТИП ПРОЕКТА \n ${sale.label} \n СОГЛАСОВАТЕЛЬ \n ${coordination} \n ЦЕЛЕВАЯ АУДИТОРИЯ ${audience} ОПИСАНИЕ \n ${description} \n ССЫЛКИ или ПУТЬ ДО ФАЙЛОВ \n ${link} \n МАТЕРИАЛЫ К ПРОЕКТУ \n ${info} \n ССЫЛКИ НА ПРИМЕР \n ${referense} \n ХРОНОМЕТРАЖ \n ${time} СТАВКА ПРОЕКТА \n ${price.label} ${price.value} \n ГДЕ БУДЕТ РАЗМЕЩЕН ПРОДУКТ \n ${destanation} \n  ВЫБЕРИТЕ ИСПОЛНИТЕЛЯ \n ${selectedOption.label} \n СРОКИ \n ${date}`




      //

      const sendToTelegram = () => {

      const TOKEN = '6953905275:AAGor-AkqyqG9-RyE6oagsh_Jpl3XnaEeGg'
      const CHAT_ID = '-1002013845900'
      const URL_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`


      fetch(URL_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({chat_id: CHAT_ID ,text: messageTG})



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
          body: JSON.stringify({chat_id: selectedOption.tgId, text: messageTG})



          }).then(responce => responce.json())
          .then(data => console.log(data))
          .catch(error => console.log(error, 'ERROR'))
      }

      }



        const sendCard = () => {
        const userKey = localStorage.getItem('key')

        if (fio !== '' && title !== '' && sale !== '' && coordination !== '' && audience !== '' && link !== '' && time !== '' && info !== '' && referense !== '' && date !== '' && destanation !== '' && description !== '') {

        fetch('https://yougile.com/api-v2/tasks', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${userKey}`
          },
          body: JSON.stringify({title: title, columnId: selectedOption.value, deadline: {deadline: timestamp}, description: JSON.stringify(messageYG)})
        }).then(responce => responce.json())
          .then(data => console.log(data))
          .catch(error => console.log(error, 'ERROR'))


        sendToTelegram()

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

        setModalActiveLike(true)
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });

        } else {

        setModaActiveDislike(true)

        }

      }





  return (
    <div className='form-container'>

                  <MyInput value={fio} onChange={(e) => {setFio(e.target.value)}} placeholder={'фио'} style={{marginTop: 20 + 'px'}}></MyInput>
                  <MyInput value={title} onChange={(e) => {setTitle(e.target.value)}} placeholder={'название проекта'} style={{marginTop: 20 + 'px'}}></MyInput>


                  <Row className='form-box mt-3 d-flex justify-content-around'>

                    <Col md={6} xs={12}>
                        <MySelect styles={{control: (styles) => {return {...styles, width: 274 + 'px', height: 61 + 'px', borderRadius: 10 + 'px',  marginBottom: 1 + 'px', paddingLeft: 10 + 'px'}}}} options={programType} placeholder={'тип проекта'} onChange={setSale}></MySelect>
                    </Col>

                    <Col md={6} xs={12}>
                        <MyInput value={coordination} onChange={(e) => {setCoordination(e.target.value)}} style={{width: 252 + 'px', marginTop: 2 + 'px'}} placeholder={'кем согласован проект'}></MyInput>
                    </Col>

                  </Row>


                  <MyInput title={'Кто ЦА проекта?'} value={audience} onChange={(e) => {setAudience(e.target.value)}} placeholder={'целевая аудитория'} style={{marginTop: 20 + 'px'}}></MyInput>

                  <MyTextArea placeholder={'краткое описание проекта'} value={description} onChange={(e) => {setDescription(e.target.value)}} style={{marginTop: 20 + 'px'}}></MyTextArea>

                  <MyInput value={link} onChange={(e) => {setLink(e.target.value)}} placeholder={'ссылки на файлы, которые нужно приложить, архив:'} style={{marginTop: 20 + 'px'}}></MyInput>

                  <MyInput value={info} onChange={(e) => {setInfo(e.target.value)}} placeholder={'сценарный план + закадровый текст(ссылку на файл)'} style={{marginTop: 20 + 'px'}}></MyInput>

                  <MyInput value={referense} onChange={(e) => {setReferense(e.target.value)}} placeholder={'пожелания, референсы (динамика, подача, ритм, музыка)'} style={{marginTop: 20 + 'px'}}></MyInput>


                  <Row className='mt-3 form-box d-flex justify-content-between'>
                    <Col md={6} xs={12}>
                        <MyInput value={time} onChange={(e) => {setTime(e.target.value)}} style={{marginTop: 2 + 'px', width: 252 + 'px'}} placeholder={'хронометраж'}></MyInput>
                    </Col>


                    <Col md={6} xs={12}>
                        <MySelect styles={{control: (styles) => {return {...styles, width: 275 + 'px', height: 61 + 'px', borderRadius: 10 + 'px',  marginBottom: 1 + 'px', paddingLeft: 10 + 'px'}}}} options={userPrice} value={price} onChange={setPrice} placeholder={'проект'}></MySelect>
                    </Col>
                  </Row>



                  <MyInput value={destanation} onChange={(e) => {setDestanation(e.target.value)}} placeholder={'площадка размещения ролика'} style={{marginTop: 20 + 'px', width: 575 + 'px', height: 61 + 'px'}}></MyInput>

                  <Row className='mt-3 form-box d-flex justify-content-between'>
                    <Col md={6} xs={12}>
                      <MySelect styles={{control: (styles) => {return {...styles, width: 275 + 'px', height: 61 + 'px', borderRadius: 10 + 'px',  marginBottom: 1 + 'px', paddingLeft: 10 + 'px'}}}} options={usersList} placeholder={'выберите исполнителя'} onChange={setSelectionOption}></MySelect>
                    </Col>

                    <Col md={6} xs={12}>
                      <MyDate date={'Выберите дату'} placeholder={'введите дату'} value={date} onChange={(e) => {setDate(e.target.value)}}></MyDate>
                    </Col>


                  </Row>


                  <MyButton style={{marginTop: 20 + 'px'}} onClick={() => {sendCard()}}>Создать</MyButton>
            </div>
  )
}

export default FormEditors