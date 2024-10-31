// css

import './filming.css'

//

import { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { getDatabase, ref, update, onValue, remove } from "firebase/database";


// redux

import { useSelector } from'react-redux'

// components

import MyInput from '../../UI/MyInput'
import MyDate from '../../UI/MyDate'
import MyTextArea from '../../UI/MyTextArea'
import MySelect from '../../UI/MySelect'
import MyTime from '../../UI/MyTime'
import MyButton from '../../UI/MyButton'
import MyButtonBack from '../../UI/MyButtonBack'
import MyCheckBox from '../../UI/MyCheckBox'

// server

import operatorList from '../../../server/operatorList'
import operatorProject from '../../../server/operatorProject'
import operatorCloth from '../../../server/operatorCloth'

//






const EditFilming = ({modalOperLike, modalOperDislike}) => {


  const navigate = useNavigate()
  const users = useSelector(state => state.users.users)



  const { setModalActiveLike } = modalOperLike
  const { setModaActiveDislike } = modalOperDislike


  const userSelect = (!users) ? [{value: 'не выбрано', label: 'не выбрано'}] : users.map((item) => {
    return {
      value: item.tgId,
      label: item.name
    }
  })




  const [fio, setFio] = useState('')
  const [title, setTitle] = useState('')
  const [user, setUser] = useState('')
  const [userColor, setUserColor]= useState('')
  const [date, setDate] = useState('')
  const [timeStart, setTimeStart] = useState('')
  const [timeEnd, setTimeEnd] = useState('')
  const [place, setPlace] = useState('')
  const [contacts, setContacts] = useState('')
  const [conditions, setConditions] = useState('')
  const [cloth, setCloth]= useState({label: 'не выбрано', value: ''})
  const [project, setProject] = useState({label: 'не выбрано', value: ''})


  const [checkedCard, setCheckedCard] = useState([])
  const [loading, setLoading] = useState(true)

  const [selectUser, setSelectUser] = useState('')

  const [techCheck, setTechCheck] = useState(false)
  const [soundCheck, setSoundCheck] = useState(false)

  // check




  const params = useParams()
  const cardId = params.id

  const techTGid = '-1002046063150'
  const soundTgId = '334273478'



  // getCard


  const getCard = () => {

    const db = getDatabase()
    const getCardBase = ref(db, 'cardsFilming/')
    onValue(getCardBase, (snapshot) => {
      const data = snapshot.val()

      if (data === null) {
        return []
      } else {
        const card = Object.values(data).filter((item) => {
          return item.id === cardId
        })

        setCheckedCard(card[0])
        setLoading(false)

      }
    })

  }


  useEffect(() => {
    getCard()

  }, [])




  // updateCard

  const selectedUser = () => (user.length < 1) ? ['не выбрано'] : user.map((item) => {return item.label})
  const selectedUserColor = () => (user.length < 1) ? ['не выбрано'] : user.map((item) => {return item.colorId})

  const messageTG =`ВНЕСЕНЫ ИЗМЕНЕНИЯ В КАРТОЧКУ ${checkedCard.title} \n \n${new Date(date).toDateString()}\n${checkedCard.timeStart} - ${checkedCard.timeEnd}\n${checkedCard.title} \nКонтакт: ${checkedCard.contacts} \nАдрес: ${checkedCard.place} \n \nОписание: ${checkedCard.conditions}\n \nПроект\n ${project.label}\nФорма одежды\n ${cloth.label}\nОПЕРАТОРЫ:\n${selectedUser().join(' ')}\n\nУчастие технического отдела ${(techCheck) ? 'ДА' : 'НЕТ'}\n\nУчастие звукорежиссера ${(soundCheck) ? 'ДА' : 'НЕТ'}`

  const messageAuthorTG =`ВНЕСЕНЫ ИЗМЕНЕНИЯ В КАРТОЧКУ ${checkedCard.title} \n \n${new Date(date).toDateString()}\n${checkedCard.timeStart} - ${checkedCard.timeEnd}\n${checkedCard.title} \nАдрес: ${checkedCard.place} \n \nОписание: ${checkedCard.conditions}\n \nПроект\n ${project.label}\nОПЕРАТОРЫ:\n${selectedUser().join(' ')}\n\nУчастие технического отдела ${(techCheck) ? 'ДА' : 'НЕТ'}\n\nУчастие звукорежиссера ${(soundCheck) ? 'ДА' : 'НЕТ'}`


  const updateCard = () => {

      if(date !== '') {

      const db = getDatabase()
        update(ref(db, 'cardsFilming/' + cardId), {

          id: cardId,
          name: checkedCard.name,
          title: checkedCard.title,
          user: selectedUser().join(' '),
          userColor: selectedUserColor().join(),
          date: new Date(date).toDateString(),
          timeStart: checkedCard.timeStart,
          timeEnd: checkedCard.timeEnd,
          place: checkedCard.place,
          contacts: checkedCard.contacts,
          conditions: checkedCard.conditions,
          projectPay: project.label,
          cloth: cloth.label,
          techEngineer: techCheck,
          soundEngineer: soundCheck

        })

      selectedIdUserSend()
      selectedAuthorSend()

      if(techCheck) {
        selectedSupportSend(techTGid)
      }

      if(soundCheck) {
        selectedSupportSend(soundTgId)
      }

      setFio('')
      setTitle('')
      setUser('')
      setDate('')
      setTimeStart('')
      setTimeEnd('')
      setPlace('')
      setConditions('')
      setContacts('')
      setTechCheck(false)
      setSoundCheck(false)

      setModalActiveLike(true)
      navigate(`/main/operator/schedule/${cardId}`)

    } else {

      setModaActiveDislike(true)

    }

  }


  //


  const selectedIdUserSend = async () => {
      return (user.length < 1) ? ['не определен'] : user.map(async (item) => {


        const TOKEN = '6953905275:AAGor-AkqyqG9-RyE6oagsh_Jpl3XnaEeGg'
        const URL_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`

        try {

          const responce = fetch(URL_API, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({chat_id: item.value, text: messageTG})
          })

          const data = await responce.json()
          return data


        } catch (error) {
          console.error(`Оишбка отправки сообщения исполнителям - ${error}`)
        }
      })
  }


  const selectedAuthorSend = async () => {

    const TOKEN = '6953905275:AAGor-AkqyqG9-RyE6oagsh_Jpl3XnaEeGg'
    const URL_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`

    try {
      const responce = await fetch(URL_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({chat_id: selectUser.value, text: messageAuthorTG})
      })

      const data = await responce.json()
      return data

    } catch (error) {
      console.error(`Ошибка отправки сообщения автору - ${error}`)

    }
  }


  const selectedSupportSend = async (id) => {

    const TOKEN = '6953905275:AAGor-AkqyqG9-RyE6oagsh_Jpl3XnaEeGg'
    const URL_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`

    try {

      const responce = await fetch(URL_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({chat_id: id, text: messageTG})
      })

      const data = await responce.json()
      console.log(data)
      return data



    } catch (error) {
      console.error(`Ошибка отправки сообщения технический отдел - ${error}`)
    }
  }



  if(loading === true) {
    return <h1 className='card-filming-loading'>LOADING</h1>
  }


  return(

    <div className="filming-container">

      <Col style={{width: '100%', textAlign: 'center', fontSize: '18px'}} className='mt-3'>внесите изменения в съёмку</Col>

      <Col md={12} sm={12} xs={12} className='mt-3'><MyInput  style={{width: '100%'}} value={checkedCard.name} onChange={(e) => {setCheckedCard({...checkedCard, name: e.target.value})}}></MyInput></Col>
      <Col md={12} sm={12} xs={12} className='mt-3'><MyInput style={{width: '100%'}} value={checkedCard.title} onChange={(e) => {setCheckedCard({...checkedCard, title: e.target.value})}}></MyInput></Col>

          <Col md={12} sm={12} xs={12} className='mt-3 d-flex'>

            <Col md={6} sm={12} xs={12}><MySelect placeholder={'Выберите оператора'} isMulti name="colors" styles={{control: (baseStyles) => ({...baseStyles, paddingLeft: 10 + 'px' , minHeight: 61 + 'px', borderRadius: 10 + 'px', width: '100%'})}} options={operatorList} value={user} onChange={setUser}></MySelect></Col>
            <Col  md={6} sm={12} xs={12}><MyDate style={{width: '100%'}} value={date} onChange={(e) => {setDate(e.target.value)}}></MyDate></Col>

          </Col>




        <Col md={12} sm={12} xs={12} className='mt-3 d-flex'>

          <Col className='mt-3' md={6} sm={12} xs={12}><MyTime title={'время начала съёмки'} value={checkedCard.timeStart} onChange={(e) => {setCheckedCard({...checkedCard, timeStart: e.target.value})}} style={{width: '98%'}}></MyTime></Col>

          <Col className='mt-3' md={6} sm={12} xs={12}><MyTime title={'время окончания съёмки'} value={checkedCard.timeEnd} onChange={(e) => {setCheckedCard({...checkedCard, timeEnd: e.target.value})}} style={{width: '98%'}}></MyTime></Col>

        </Col>

      <Col className='mt-3' md={12} sm={12} xs={12}><MyInput placeholder={'место съёмки'} style={{width: '100%'}} value={checkedCard.place} onChange={(e) => {setCheckedCard({...checkedCard, place: e.target.value})}}></MyInput></Col>
      <Col className='mt-3' md={12} sm={12} xs={12}><MyInput placeholder={'контакты'} style={{width: '100%'}} value={checkedCard.contacts} onChange={(e) => {setCheckedCard({...checkedCard, contacts: e.target.value})}}></MyInput></Col>

      <Col className='mt-3' md={12} sm={12} xs={12}><MyTextArea placeholder={'условия съёмки'} style={{width: '100%'}} value={checkedCard.conditions} onChange={(e) => {setCheckedCard({...checkedCard, conditions: e.target.value})}}></MyTextArea></Col>

      <Col md={12} sm={12} xs={12} className='mt-3 d-flex'>

        <Col><MySelect placeholder={'Статус проекта'} name="colors" styles={{control: (baseStyles) => ({...baseStyles, paddingLeft: 10 + 'px' , minHeight: 61 + 'px', borderRadius: 10 + 'px', width: '98%'})}} options={operatorProject} onChange={setProject}></MySelect></Col>

        <Col><MySelect placeholder={'Форма одежды'} name="colors" styles={{control: (baseStyles) => ({...baseStyles, paddingLeft: 10 + 'px' , minHeight: 61 + 'px' ,  borderRadius: 10 + 'px', width: '98%'})}} options={operatorCloth} onChange={setCloth}></MySelect></Col>

        </Col>


        <Col md={12} sm={12} xs={12} className='mt-3' style={{fontSize: '12px'}}>Выберите автора для обратного сообщения о просталенной съёмке</Col>
        <Col md={12} sm={12} xs={12} className='mt-1'><MySelect placeholder={'автор'} options={userSelect} styles={{control: (baseStyles) => ({...baseStyles, paddingLeft: 10 + 'px', minHeight: 61 + 'px', borderRadius: 10 + 'px', width: '100%'})}} onChange={setSelectUser}></MySelect></Col>

        <Col md={12} sm={12} xs={12} className='mt-3'>

          <MyCheckBox title={'Проставьте галочку если необходимо участие технического отдела на съёмке'} info={'Участие технического отдела'} checked={techCheck} onChange={() => {setTechCheck(prev => !prev)}}></MyCheckBox>
          <MyCheckBox title={'Проставьте галочку если необходимо участие звукорежиссера на съёмке'} info={'Участие звукорежиссера'} checked={soundCheck} onChange={() => {setSoundCheck(prev => !prev)}}></MyCheckBox>

        </Col>




      <Row className='mt-4'>
        <Col md={6} sm={6} xs={12} className='mb-4'>
          <MyButton onClick={() => {updateCard()}}>Изменить</MyButton>
        </Col>

        <Col md={6} sm={6} xs={12} className='mb-4'>
            <Link to={'/main/schedule'}><MyButtonBack>НАЗАД</MyButtonBack></Link>
        </Col>
      </Row>


    </div>
  )
}

export default EditFilming