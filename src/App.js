import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'


import { Container, Col, Row } from 'react-bootstrap'
import { useId } from 'react'


// img

import logoUTV from './asset/logoUTV.svg'


// components

import MyInput from './components/MyInput'
import MyDate from './components/MyDate'
import MyButton from './components/MyButton'

//

import { useState, useEffect } from 'react'



const App = () => {

  // auth

  const [companyId, setCompanyId] = useState('')
  const [userKey, setUserKey] =  useState('')
  const [listWork, setListWork] = useState('')

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



  const id = useId()


useEffect(() => {

try {

  const fetchId = async () => {
    const data = await fetch('https://yougile.com/api-v2/auth/companies', {
      method: 'POST',
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify({login: 'Kyle.B@mail.ru', password: 'Metelev1989'})
    })

    const json = await data.json()
    return setCompanyId(json.content[0].id)

    }

    fetchId()

    } catch (error) {
      console.error(error, 'error')

    }

}, [])



useEffect(() => {

  try {

    const fetchKey = async () => {
      const data = await fetch('https://yougile.com/api-v2/auth/keys', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({login: 'Kyle.B@mail.ru', password: 'Metelev1989', companyId: companyId})
      })

      const json = await data.json()
      console.log(json)
      }

      setTimeout(() => {fetchKey()}, 2000)

      } catch (error) {
        console.error(error, 'error')
      }


}, [companyId])



useEffect(() => {


  try {

    const fetchKey = async () => {
      const data = await fetch('https://yougile.com/api-v2/auth/keys/get', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({login: 'Kyle.B@mail.ru', password: 'Metelev1989', companyId: companyId})
      })

      const json = await data.json()
      console.log(json)
      return setUserKey(json[0].key)


      }

      setTimeout(() => {fetchKey()}, 2000)

      } catch (error) {
        console.error(error, 'error')
      }


    }, [companyId])




useEffect(() => {

try {

  const fetchDesk = async () => {
    const data = await fetch('https://yougile.com/api-v2/columns', {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${userKey}`
      }
    })

    const json = await data.json()
    setListWork(json.content[0].id)
  }

  setTimeout(() => {fetchDesk()}, 3000)

} catch (error) {

  console.error(error, 'error')

}



}, [listKey])



const message = `ФИО АВТОРА \n ${fio}\n ПЕРЕДАЧА ПРОДАНА?\n ${sale}\n КАК УПОМИНАЕМ КЛИЕНТА, ЕСТЬ ЛИ СОГЛАСОВАНИЕ?\n ${coordination}\n КТО ЦА ПРОЕКТА?\n ${audience}\n КРАТКОЕ ОПИСАНИЕ ФОРМАТА (ИНТЕРВЬЮ, ДОКУМЕНТАЛЬНЫЙ ФИЛЬМ, ИГОРОВОЙ И ТД.):\n ${description}\n ССЫЛКИ НА ФАЙЛЫ, КОТОРЫЕ НУЖНО ПРИЛОЖИТЬ, АРХИВ: ${link}\n ХРОНОМЕТРАЖ: ${time}\n СЦЕНАРНЫЙ ПЛАН + ЗАКАДРОВЫЙ ТЕКСТ(ССЫЛКУ НА ФАЙЛ): ${info}\n ПОЖЕЛАНИЯ, РЕФЕРЕНСЫ (ДИНАМИКА, ПОДАЧА, РИТМ, МУЗЫКА): ${referense}\n СРОК СДАЧИ ПРОЕКТА ${date}`


const sendToTelegram = () => {

  const TOKEN = '6953905275:AAGor-AkqyqG9-RyE6oagsh_Jpl3XnaEeGg'
  const CHAT_ID = '85252645'
  const URL_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`


  fetch(URL_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({chat_id: CHAT_ID, text: message})



  }).then(responce => responce.json())
    .then(data => console.log(data))
    .catch(error => console.log(error, 'ERROR'))
}








const sendCard = () => {


  if (fio !== '' && title !== '' && sale !== '' && coordination !== '' && audience !== '' && link !== '' && time !== '' && info !== '' && referense !== '' && date !== '' && destanation !== '') {

    fetch('https://yougile.com/api-v2/tasks', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${userKey}`
      },
      body: JSON.stringify({title: title, columnId: '6a207040-1dc2-49b7-be53-6fbb1425de48', description: JSON.stringify(message)})
    }).then(responce => responce.json())
      .then(data => console.log(data))
      .catch(error => console.log(error, 'ERROR'))


    sendToTelegram()

    setFio('')
    setTitle('')
    setSale('')
    setCoordination('')
    setAudience('')
    setDescription('')
    setLink('')
    setTime('')
    setInfo('')
    setReferense('')
    setDate('')

  } else {
    return alert('Заполните форму целиком')
  }








}


  return(

    <Container fluid='md'>
      <Row>
        <Col className='col-12 d-flex flex-column justify-content-center'>
            <div className='form-container'>
            <img className='logo' src={logoUTV} alt="logoUTV" />

            <MyInput title={'Ваше Имя'} value={fio} onChange={(e) => {setFio(e.target.value)}}></MyInput>
            <MyInput title={'Название передачи, ролика и тд.:'} value={title} onChange={(e) => {setTitle(e.target.value)}}></MyInput>
            <MyInput title={'Передача продана?'} value={sale} onChange={(e) => {setSale(e.target.value)}}></MyInput>
            <MyInput title={'Как упоминаем клиента, есть ли согласование?'} value={coordination} onChange={(e) => {setCoordination(e.target.value)}}></MyInput>
            <MyInput title={'Кто ЦА проекта?'} value={audience} onChange={(e) => {setAudience(e.target.value)}}></MyInput>
            <MyInput title={'Краткое описание формата (интервью, документальный фильм, игоровой и тд.):'} value={description} onChange={(e) => {setDescription(e.target.value)}}></MyInput>
            <MyInput title={'Ссылки на файлы, которые нужно приложить, архив:'} value={link} onChange={(e) => {setLink(e.target.value)}}></MyInput>
            <MyInput title={'Хронометраж:'} value={time} onChange={(e) => {setTime(e.target.value)}}></MyInput>
            <MyInput title={'Сценарный план + закадровый текст(ссылку на файл):'} value={info} onChange={(e) => {setInfo(e.target.value)}}></MyInput>
            <MyInput title={'Пожелания, референсы (динамика, подача, ритм, музыка):'} value={referense} onChange={(e) => {setReferense(e.target.value)}}></MyInput>

            <MyDate date={'Выберите дату'} value={date} onChange={(e) => {setDate(e.target.value)}}></MyDate>

            <MyInput title={'Площадка размещения ролика(эфир, ютуб *инстаграм (для коротких роликов автор пишет таймкоды)):'} value={destanation} onChange={(e) => {setDestanation(e.target.value)}}></MyInput>

            <MyButton style={{marginTop: 20 + 'px'}} onClick={() => {sendCard()}}>Создать</MyButton>
            </div>
        </Col>
      </Row>
    </Container>


  )
}


export default App