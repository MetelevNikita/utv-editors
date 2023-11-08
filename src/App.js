import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'


import { Container, Col, Row } from 'react-bootstrap'

// img

import logoUTV from './asset/logoUTV.svg'
import like from './asset/like.svg'
import dislike from './asset/dislike.svg'


import usersList from './usersList'
import userPrice from './userPrice'
import programType from './programType'

// components

import MyInput from './components/MyInput'
import MyDate from './components/MyDate'
import MyButton from './components/MyButton'
import MySelect from './components/MySelect'
import Footer from './components/Footer'
import MyTextArea from './components/MyTextArea'

import ModalPageLike from './components/modalpage/Modal-page-like'


//

import { useState, useEffect } from 'react'
import ModalPageDislike from './components/modalpage/Modal-page-dislike'




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
  const [price, setPrice] = useState('')



  const newDate = new Date(date)
  const timestamp = newDate.getTime()



  // modal


  const [modalActiveLike, setModalActiveLike] = useState(false)
  const [modalActiveDislike, setModaActiveDislike] = useState(false)



  console.log(sale)





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
        console.log('3')
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

      // useEffect(() => {getList()}, [])



    // message


  const messageYG = `ФИО АВТОРА ${fio} ВЫБРАННЫЙ ИСПОЛНИТЕЛЬ ${selectedOption.label} ПЕРЕДАЧА ПРОДАНА?\n ${sale.label} КАК УПОМИНАЕМ КЛИЕНТА, ЕСТЬ ЛИ СОГЛАСОВАНИЕ? ${coordination} КТО ЦА ПРОЕКТА?\n ${audience} КРАТКОЕ ОПИСАНИЕ ФОРМАТА (ИНТЕРВЬЮ, ДОКУМЕНТАЛЬНЫЙ ФИЛЬМ, ИГОРОВОЙ И ТД.): ${description} ССЫЛКИ НА ФАЙЛЫ, КОТОРЫЕ НУЖНО ПРИЛОЖИТЬ, АРХИВ: ${link} ХРОНОМЕТРАЖ: ${time} СЦЕНАРНЫЙ ПЛАН + ЗАКАДРОВЫЙ ТЕКСТ(ССЫЛКУ НА ФАЙЛ): ${info} ПОЖЕЛАНИЯ, РЕФЕРЕНСЫ (ДИНАМИКА, ПОДАЧА, РИТМ, МУЗЫКА): ${referense} СРОК СДАЧИ ПРОЕКТА ${date}`

  const messageTG = `ФИО АВТОРА \n ${fio} \n ВЫБРАННЫЙ ИСПОЛНИТЕЛЬ \n ${selectedOption.label} \n ПЕРЕДАЧА ПРОДАНА?\n ${sale.label}\n КАК УПОМИНАЕМ КЛИЕНТА, ЕСТЬ ЛИ СОГЛАСОВАНИЕ?\n ${coordination}\n КТО ЦА ПРОЕКТА?\n ${audience}\n КРАТКОЕ ОПИСАНИЕ ФОРМАТА (ИНТЕРВЬЮ, ДОКУМЕНТАЛЬНЫЙ ФИЛЬМ, ИГОРОВОЙ И ТД.):\n ${description}\n ССЫЛКИ НА ФАЙЛЫ, КОТОРЫЕ НУЖНО ПРИЛОЖИТЬ, АРХИВ:\n ${link}\n ХРОНОМЕТРАЖ:\n ${time}\n СЦЕНАРНЫЙ ПЛАН + ЗАКАДРОВЫЙ ТЕКСТ(ССЫЛКУ НА ФАЙЛ):\n ${info}\n ПОЖЕЛАНИЯ, РЕФЕРЕНСЫ (ДИНАМИКА, ПОДАЧА, РИТМ, МУЗЫКА):\n ${referense}\n СРОК СДАЧИ ПРОЕКТА\n ${date}`


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
        body: JSON.stringify({chat_id: CHAT_ID, text: messageTG})



      }).then(responce => responce.json())
        .then(data => console.log(data))
        .catch(error => console.log(error, 'ERROR'))
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
    setSale('')
    setCoordination('')
    setAudience('')
    setDescription('')
    setLink('')
    setTime('')
    setInfo('')
    setReferense('')
    setDate('')
    setDestanation('')

    setModalActiveLike(true)

  } else {

    setModaActiveDislike(true)

  }

}




  return(

    <Container fluid='md'>
      <Row>
        <Col sm={12} xs={12}>
            <div className='form-container'>
                  <img className='logo' src={logoUTV} alt="logoUTV" />
                  <div className="logo-subtitle">СЕРВИС ЗАЯВОК ВИДЕО-МОНТАЖА</div>

                  <MyInput value={fio} onChange={(e) => {setFio(e.target.value)}} placeholder={'фио'} style={{marginTop: 20 + 'px', width: 575 + 'px', height: 61 + 'px'}}></MyInput>
                  <MyInput value={title} onChange={(e) => {setTitle(e.target.value)}} placeholder={'название проекта'} style={{marginTop: 20 + 'px', width: 575 + 'px', height: 61 + 'px'}}></MyInput>


                  <Row className='mt-3 d-flex justify-content-between'>

                    <Col md={6} xs={12}>
                        <MySelect styles={{control: (styles) => {return {...styles, width: 274 + 'px', height: 61 + 'px', borderRadius: 10 + 'px',  marginBottom: 1 + 'px', paddingLeft: 10 + 'px'}}}} options={programType} placeholder={'тип проекта'} onChange={setSale}></MySelect>
                    </Col>

                    <Col md={6} xs={12}>
                        <MyInput value={coordination} onChange={(e) => {setCoordination(e.target.value)}} style={{width: 275 + 'px', marginTop: 2 + 'px', marginLeft: 10 + 'px'}} placeholder={'кем согласован проект'}></MyInput>
                    </Col>

                  </Row>


                  <MyInput title={'Кто ЦА проекта?'} value={audience} onChange={(e) => {setAudience(e.target.value)}} placeholder={'целевая аудитория'} style={{marginTop: 20 + 'px',width: 575 + 'px', height: 61 + 'px'}}></MyInput>

                  <MyTextArea placeholder={'краткое описание проекта'} value={description} onChange={(e) => {setDescription(e.target.value)}} style={{marginTop: 20 + 'px', width: 575 + 'px', height: 214 + 'px'}}></MyTextArea>

                  <MyInput value={link} onChange={(e) => {setLink(e.target.value)}} placeholder={'ссылки на файлы, которые нужно приложить, архив:'} style={{marginTop: 20 + 'px', width: 575 + 'px', height: 61 + 'px'}}></MyInput>

                  <MyInput value={info} onChange={(e) => {setInfo(e.target.value)}} placeholder={'сценарный план + закадровый текст(ссылку на файл)'} style={{marginTop: 20 + 'px',width: 575 + 'px', height: 61 + 'px'}}></MyInput>

                  <MyInput value={referense} onChange={(e) => {setReferense(e.target.value)}} placeholder={'пожелания, референсы (динамика, подача, ритм, музыка)'} style={{marginTop: 20 + 'px', width: 575 + 'px', height: 61 + 'px'}}></MyInput>


                  <Row className='mt-3'>
                    <Col md={6} xs={12}>
                        <MyInput value={time} onChange={(e) => {setTime(e.target.value)}} style={{marginTop: 2 + 'px', width: 275 + 'px'}} placeholder={'хронометраж'}></MyInput>
                    </Col>


                    <Col md={6} xs={12}>
                        <MySelect styles={{control: (styles) => {return {...styles, width: 275 + 'px', height: 61 + 'px', borderRadius: 10 + 'px',  marginBottom: 1 + 'px', paddingLeft: 10 + 'px'}}}} options={userPrice} placeholder={'проект'}></MySelect>
                    </Col>
                  </Row>



                  <MyInput value={destanation} onChange={(e) => {setDestanation(e.target.value)}} placeholder={'площадка размещения ролика'} style={{marginTop: 20 + 'px',width: 575 + 'px', height: 61 + 'px'}}></MyInput>

                  <Row>
                    <Col md={6} xs={12} className='mt-3 d-flex justify-content-center align-items-center align-self-center'>
                      <MySelect styles={{control: (styles) => {return {...styles, height: 61 + 'px', borderRadius: 10 + 'px',  marginBottom: 1 + 'px', paddingLeft: 10 + 'px'}}}} options={usersList} placeholder={'выберите исполнителя'} onChange={setSelectionOption}></MySelect>
                    </Col>

                    <Col md={6} xs={12} className='mt-3 d-flex justify-content-center align-items-center'>
                      <MyDate date={'Выберите дату'} value={date} onChange={(e) => {setDate(e.target.value)}}></MyDate>
                    </Col>


                  </Row>


                  <MyButton style={{marginTop: 20 + 'px', maxWidth: 100 + '%' , width: 575 + 'px', height: 60 + 'px'}} onClick={() => {sendCard()}}>Создать</MyButton>
            </div>


            <Footer></Footer>


            <ModalPageLike like={{modalActiveLike, setModalActiveLike}} modalLikeImg={like} modalLikeTitle={'ЗАЯВКА НА ПРОЕКТ ВИДЕО-МОНТАЖА ОТПРАВЛЕНА'} modalBtnTitle={'СПАСИБО'}></ModalPageLike>

            <ModalPageDislike dislike={{modalActiveDislike, setModaActiveDislike}} modalDislikeImg={dislike} modalDislikeTitle={'заполните все поля'} modalBtnTitle={'Продолжить'}></ModalPageDislike>





        </Col>
      </Row>
    </Container>


  )
}


export default App