// css

import './filming.css'

//

import { useEffect, useState } from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import { useId } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { getDatabase, ref, set, get, update, onValue } from "firebase/database";
import uuid from 'react-uuid'

// components

import MyInput from '../../UI/MyInput'
import MyDate from '../../UI/MyDate'
import MyTextArea from '../../UI/MyTextArea'
import MySelect from '../../UI/MySelect'
import MyTime from '../../UI/MyTime'
import MyButton from '../../UI/MyButton'
import MyButtonBack from '../../UI/MyButtonBack'

// server

import oepratorList from '../../../server/operatorList'
import operatorProject from '../../../server/operatorProject'
import operatorCloth from '../../../server/operatorCloth'



const EditFilming = ({modalOperLike, modalOperDislike}) => {

  const navigate = useNavigate()

  const {modalActiveLike, setModalActiveLike} = modalOperLike
  const {modalActiveDislike, setModaActiveDislike} = modalOperDislike



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


  const params = useParams()
  const cardId = params.id

  const id = uuid()



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

  const messageTG = `ВНЕСЕНЫ ИЗМЕНЕНИЯ В КАРТОЧКУ ${title} \n \n ФИО АВТОРА: \n ${fio} \n \n НАЗВАНИЕ ПРОЕКТА: \n ${title} \n \n ОПЕРАТОРЫ: \n ${selectedUser().join(' ')} \n \n ДАТА СЪЕМКИ \n ${new Date(date).toDateString()} \n \n ВРЕМЯ \n ${timeStart} - ${timeEnd} \n \n АДРЕС \n ${place} \n \n КОНТАКТЫ \n ${contacts} \n \n ОПИСАНИЕ \n ${conditions} \n \n Проект \n ${project.label} \n \n Форма одежды \n ${cloth.label}`



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
          cloth: cloth.label

        })

      selectedIdUserSend()

      setFio('')
      setTitle('')
      setUser('')
      setDate('')
      setTimeStart('')
      setTimeEnd('')
      setPlace('')
      setConditions('')
      setContacts('')

      setModalActiveLike(true)
      navigate(`/main/operator/schedule/${cardId}`)

    } else {

      setModaActiveDislike(true)

    }

  }

    const selectedIdUserSend = () => {
      return (user.length < 1) ? ['не определен'] : user.map((item) => {


        const TOKEN = '6953905275:AAGor-AkqyqG9-RyE6oagsh_Jpl3XnaEeGg'
        const URL_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`


        return fetch(URL_API, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({chat_id: item.value, text: messageTG})
              }).then(responce => responce.json())
                .then(data => console.log(data))
                .catch(error => console.log(error, 'ERROR'))
            })
  }





  if(loading === true) {
    return <h1 className='card-filming-loading'>LOADING</h1>
  }





  return(

    <div className="filming-container">

      <div className='filming-edit-title'>внесите изменения в съёмку</div>

      <MyInput  style={{marginTop: 20 + 'px'}} value={checkedCard.name} onChange={(e) => {setCheckedCard({...checkedCard, name: e.target.value})}}></MyInput>
      <MyInput  style={{marginTop: 20 + 'px'}} value={checkedCard.title} onChange={(e) => {setCheckedCard({...checkedCard, title: e.target.value})}}></MyInput>

      <Row className='d-flex justify-content-md-center'>

            <Col className='mt-1 d-flex' md={6} sm={12} xs={12}>

                <MySelect placeholder={'Выберите оператора'} isMulti name="colors" styles={{control: (baseStyles) => ({...baseStyles, paddingLeft: 10 + 'px' , minHeight: 61 + 'px' , marginTop: 20 + 'px', borderRadius: 10 + 'px'})}} options={oepratorList} value={user} onChange={setUser}></MySelect>

            </Col>



            <Col className='mt-1 d-flex justify-content-center' md={6} sm={12} xs={12}>

                  <MyDate style={{marginTop: 20 + 'px', paddingLeft: 30 + 'px'}} value={date} onChange={(e) => {setDate(e.target.value)}}></MyDate>

            </Col>

      </Row>


      <Row className='d-flex justify-content-md-center'>

          <Col className='mt-4 mb-4 d-flex justify-content-center' md={6} sm={12} xs={12}>

              <MyTime title={'время начала съёмки'} value={checkedCard.timeStart} onChange={(e) => {setCheckedCard({...checkedCard, timeStart: e.target.value})}}></MyTime>

          </Col>

          <Col className='mt-4 mb-4 d-flex justify-content-center' md={6} sm={12} xs={12}>

              <MyTime title={'время окончания съёмки'} value={checkedCard.timeEnd} onChange={(e) => {setCheckedCard({...checkedCard, timeEnd: e.target.value})}}></MyTime>

          </Col>

      </Row>

      <MyInput placeholder={'место съёмки'} style={{marginTop: 20 + 'px'}} value={checkedCard.place} onChange={(e) => {setCheckedCard({...checkedCard, place: e.target.value})}}></MyInput>
      <MyInput placeholder={'контакты'} style={{marginTop: 20 + 'px'}} value={checkedCard.contacts} onChange={(e) => {setCheckedCard({...checkedCard, contacts: e.target.value})}}></MyInput>

      <MyTextArea placeholder={'условия съёмки'} style={{marginTop: 20 + 'px'}} value={checkedCard.conditions} onChange={(e) => {setCheckedCard({...checkedCard, conditions: e.target.value})}}></MyTextArea>

      <Row>
        <Col>
          <MySelect placeholder={'Статус проекта'} name="colors" styles={{control: (baseStyles) => ({...baseStyles, paddingLeft: 10 + 'px' , minHeight: 61 + 'px' , marginTop: 20 + 'px', borderRadius: 10 + 'px', width: 250 + 'px'})}} options={operatorProject} onChange={setProject}></MySelect>
        </Col>

        <Col>
        <MySelect placeholder={'Форма одежды'} name="colors" styles={{control: (baseStyles) => ({...baseStyles, paddingLeft: 10 + 'px' , minHeight: 61 + 'px' , marginTop: 20 + 'px', borderRadius: 10 + 'px', width: 250 + 'px'})}} options={operatorCloth} onChange={setCloth}></MySelect>
        </Col>
      </Row>


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