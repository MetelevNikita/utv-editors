import './App.css'
import { useId } from 'react'

// img

import logoUTV from './asset/logoUTV.svg'

//

import { Container, Col, Row  } from 'react-bootstrap'


// components

import MyInput from './components/MyInput'
import MyDate from './components/MyDate'

//

import { useState, useEffect } from 'react'
import MyButton from './components/MyButton'


const App = () => {

  // auth

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
    const fetchId = async () => {
      const data = await fetch('https://yougile.com/api-v2/auth/companies', {
        method: 'POST',
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify({login: 'Kyle.B@mail.ru', password: 'Metelev1989'})
      })

      const json = await data.json()
      localStorage.setItem('id', JSON.stringify(json.content[0].id))
    }

fetchId()

}, [])


const companyId = localStorage.getItem('id')


useEffect(() => {
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
    localStorage.setItem('key', JSON.stringify(json[0].key))

  fetchKey()
  }

}, [companyId])


const listKey = localStorage.getItem('key')


useEffect(() => {
  const fetchDesk = async () => {
    const data = await fetch('https://yougile.com/api-v2/columns', {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${listKey}`
      }
    })

    const json = await data.json()
    console.log(json)
    setListWork(json.content[0].id)
  }


  fetchDesk()
}, [])








const sendCard = () => {


  const newCard = {
    name: fio,
    title: title,
    sale: sale,
    coordination: coordination,
    audience: audience,
    description: description,
    link: link,
    time: time,
    info: info,
    referense: referense,
    date: date

  }


    const message = `ФИО АВТОРА \n ${fio}\n ПЕРЕДАЧА ПРОДАНА?\n ${sale}\n КАК УПОМИНАЕМ КЛИЕНТА, ЕСТЬ ЛИ СОГЛАСОВАНИЕ?\n ${coordination}\n КТО ЦА ПРОЕКТА?\n ${audience}\n КРАТКОЕ ОПИСАНИЕ ФОРМАТА (ИНТЕРВЬЮ, ДОКУМЕНТАЛЬНЫЙ ФИЛЬМ, ИГОРОВОЙ И ТД.): ${description}\n ССЫЛКИ НА ФАЙЛЫ, КОТОРЫЕ НУЖНО ПРИЛОЖИТЬ, АРХИВ: ${link} \n ХРОНОМЕТРАЖ: ${time}\n СЦЕНАРНЫЙ ПЛАН + ЗАКАДРОВЫЙ ТЕКСТ(ССЫЛКУ НА ФАЙЛ): ${info}\n ПОЖЕЛАНИЯ, РЕФЕРЕНСЫ (ДИНАМИКА, ПОДАЧА, РИТМ, МУЗЫКА): ${referense}\n СРОК СДАЧИ ПРОЕКТА ${date}`


  fetch('https://yougile.com/api-v2/tasks', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${listKey}`
    },
    body: JSON.stringify({title: title, columnId: '6a207040-1dc2-49b7-be53-6fbb1425de48', description: JSON.stringify(newCard)})
  }).then(responce => responce.json())
    .then(data => console.log(data))




  console.log(newCard)
}


  return(

    <Container fluid='md'>
      <Row>
        <Col className='col-2'>

        <img className='logo' src={logoUTV} alt="logoUTV" />


        <div className='form-container'>

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

        <MyInput title={'Площадка размещения ролика(эфир, ютуб *инстаграм (для коротких роликов автор пишет таймкоды)):'} value={time} onChange={(e) => {setTime(e.target.value)}}></MyInput>

        <MyButton style={{marginTop: 20 + 'px'}} onClick={() => {sendCard()}}>Создать</MyButton>


        </div>





        </Col>
      </Row>
    </Container>

  )
}


export default App