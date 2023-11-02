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
import MySelect from './components/MySelect'

//

import { useState, useEffect } from 'react'



const App = () => {

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



  const id = useId()

  // Получаем id

  const fetchId = async () => {
    const res = await fetch('https://yougile.com/api-v2/auth/companies', {
      method: 'POST',
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify({login: 'Kyle.B@mail.ru', password: 'Metelev1989'})
    })

    const data = await res.json()
    console.log(data)
    console.log('1')
    return localStorage.setItem('id', data.content[0].id)
    }


    // получаем key


    const fetchKey = async () => {
      const companyId = localStorage.getItem('id')
      const res = await fetch('https://yougile.com/api-v2/auth/keys/get', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({login: 'Kyle.B@mail.ru', password: 'Metelev1989', companyId: companyId})
      })

      const data = await res.json()
      console.log(data)
      console.log('2')
      return localStorage.setItem('key', data[0].key)

      }

      // получаем colums


      const fetchDesk = async () => {
        const companyKey = localStorage.getItem('key')
        const res = await fetch('https://yougile.com/api-v2/columns', {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${companyKey}`
          }
        })

        const data = await res.json()
        console.log(data)
        console.log('3')
        return setColums(data.content[0].id)

      }


      // получаем пользователей

      const fetchUser = async () => {
        const companyKey = localStorage.getItem('key')
        const res = await fetch('https://yougile.com/api-v2/boards', {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${companyKey}`
          }
        })

        const data = await res.json()
        console.log(data)
        return setUser(data.content)
      }






      const getColums = async () => {
        let a = await fetchId()
        console.log(a)
        let b = await fetchKey()
        console.log(b)
        let c = await fetchDesk()
        console.log(c)
        let v = await fetchUser()
        console.log(v)
      }






    useEffect(() => {getColums()}, [])




    console.log(user)














  const messageYG = `ФИО АВТОРА ${fio} ПЕРЕДАЧА ПРОДАНА?\n ${sale} КАК УПОМИНАЕМ КЛИЕНТА, ЕСТЬ ЛИ СОГЛАСОВАНИЕ? ${coordination} КТО ЦА ПРОЕКТА?\n ${audience} КРАТКОЕ ОПИСАНИЕ ФОРМАТА (ИНТЕРВЬЮ, ДОКУМЕНТАЛЬНЫЙ ФИЛЬМ, ИГОРОВОЙ И ТД.): ${description} ССЫЛКИ НА ФАЙЛЫ, КОТОРЫЕ НУЖНО ПРИЛОЖИТЬ, АРХИВ: ${link} ХРОНОМЕТРАЖ: ${time} СЦЕНАРНЫЙ ПЛАН + ЗАКАДРОВЫЙ ТЕКСТ(ССЫЛКУ НА ФАЙЛ): ${info} ПОЖЕЛАНИЯ, РЕФЕРЕНСЫ (ДИНАМИКА, ПОДАЧА, РИТМ, МУЗЫКА): ${referense} СРОК СДАЧИ ПРОЕКТА ${date}`


  const messageTG = `ФИО АВТОРА \n ${fio}\n ПЕРЕДАЧА ПРОДАНА?\n ${sale}\n КАК УПОМИНАЕМ КЛИЕНТА, ЕСТЬ ЛИ СОГЛАСОВАНИЕ?\n ${coordination}\n КТО ЦА ПРОЕКТА?\n ${audience}\n КРАТКОЕ ОПИСАНИЕ ФОРМАТА (ИНТЕРВЬЮ, ДОКУМЕНТАЛЬНЫЙ ФИЛЬМ, ИГОРОВОЙ И ТД.):\n ${description}\n ССЫЛКИ НА ФАЙЛЫ, КОТОРЫЕ НУЖНО ПРИЛОЖИТЬ, АРХИВ:\n ${link}\n ХРОНОМЕТРАЖ:\n ${time}\n СЦЕНАРНЫЙ ПЛАН + ЗАКАДРОВЫЙ ТЕКСТ(ССЫЛКУ НА ФАЙЛ):\n ${info}\n ПОЖЕЛАНИЯ, РЕФЕРЕНСЫ (ДИНАМИКА, ПОДАЧА, РИТМ, МУЗЫКА):\n ${referense}\n СРОК СДАЧИ ПРОЕКТА\n ${date}`


const sendToTelegram = () => {

  const TOKEN = '6953905275:AAGor-AkqyqG9-RyE6oagsh_Jpl3XnaEeGg'
  const CHAT_ID = '85252645'
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


console.log(selectedOption)








const sendCard = () => {

  if (fio !== '' && title !== '' && sale !== '' && coordination !== '' && audience !== '' && link !== '' && time !== '' && info !== '' && referense !== '' && date !== '' && destanation !== '') {
    const companyKey = localStorage.getItem('key')
    fetch('https://yougile.com/api-v2/tasks', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${companyKey}`
      },
      body: JSON.stringify({title: title, columnId: '6a207040-1dc2-49b7-be53-6fbb1425de48', description: JSON.stringify(messageYG)})
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


            <div className='form-horizontal-box'>
              <MySelect select={'Выберите исполнителя'} value={selectedOption} onChange={(e) => {setSelectionOption(e.target.value)}}>{Array.from(user).map((item) => {return <option>{item.title}</option>})}</MySelect>
              <MyDate date={'Выберите дату'} value={date} onChange={(e) => {setDate(e.target.value)}}></MyDate>

            </div>



            <MyInput title={'Площадка размещения ролика(эфир, ютуб *инстаграм (для коротких роликов автор пишет таймкоды)):'} value={destanation} onChange={(e) => {setDestanation(e.target.value)}}></MyInput>

            <MyButton style={{marginTop: 20 + 'px'}} onClick={() => {sendCard()}}>Создать</MyButton>
            </div>
        </Col>
      </Row>
    </Container>


  )
}


export default App