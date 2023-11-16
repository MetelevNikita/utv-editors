// css

import './filming.css'

//

import { useState } from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import { useId } from 'react'

// components

import MyInput from '../../UI/MyInput'
import MyDate from '../../UI/MyDate'
import MyTextArea from '../../UI/MyTextArea'
import MySelect from '../../UI/MySelect'
import MyTime from '../../UI/MyTime'
import MyButton from '../../UI/MyButton'

// server

import oepratorList from '../../../server/operatorList'



const CreateFilming = () => {

  const [fio, setFio] = useState('')
  const [title, setTitle] = useState('')
  const [user, setUser] = useState('')
  const [date, setDate] = useState('')
  const [timeStart, setTimeStart] = useState('')
  const [timeEnd, setTimeEnd] = useState('')
  const [place, setPlace] = useState('')
  const [contacts, setContacts] = useState('')
  const [conditions, setConditions] = useState('')

  const id = useId()
  const URL_FIREBASE = 'https://utv-edit-list-default-rtdb.firebaseio.com/card.json'



  const sendCardFilming = () => {

    if(fio !== '' && title !== '' && date !== '' && timeStart !== '' && timeEnd !== '' && place !== '' && contacts !== '' && conditions !== '') {

      const cardFilming = {
        id: id,
        name: fio,
        title: title,
        user: user.label,
        date: new Date(date).toDateString(),
        timeStart: timeStart,
        timeEnd: timeEnd,
        place: place,
        contacts: contacts,
        conditions: conditions
      }
        console.log(cardFilming)

        fetch(URL_FIREBASE, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({cardFilming})
        }).then(responce => responce.json())
          .then(data => console.log(data))
          .catch(error => console.log(error, 'ERROR'))




          setFio('')
          setTitle('')
          setUser('')
          setDate('')
          setTimeStart('')
          setTimeEnd('')
          setPlace('')
          setConditions('')
          setContacts('')

    } else {

      alert('Заполни все поля')


    }
  }



  return(
    <div className="filming-container">

      <MyInput placeholder={'ФИО'} style={{marginTop: 20 + 'px'}} value={fio} onChange={(e) => {setFio(e.target.value)}}></MyInput>
      <MyInput placeholder={'Название съёмки'} style={{marginTop: 20 + 'px'}} value={title} onChange={(e) => {setTitle(e.target.value)}}></MyInput>
      <MySelect placeholder={'Выберите оператора'} styles={{control: (baseStyles) => ({...baseStyles, width: 612 + 'px', paddingLeft: 10 + 'px' , height: 61 + 'px' , marginTop: 20 + 'px', borderRadius: 10 + 'px'})}} options={oepratorList} value={user} onChange={setUser}></MySelect>

      <MyDate style={{width: 612 + 'px', marginTop: 20 + 'px', paddingLeft: 30 + 'px'}} value={date} onChange={(e) => {setDate(e.target.value)}}></MyDate>

      <Row className='d-flex justify-content-md-center'>

          <Col className='mt-4 mb-5 d-flex justify-content-center' md={6} sm={12} xs={12}>

              <MyTime title={'время начала съёмки'} value={timeStart} onChange={(e) => {setTimeStart(e.target.value)}}></MyTime>

          </Col>

          <Col className='mt-4 mb-5 d-flex justify-content-center' md={6} sm={12} xs={12}>

              <MyTime title={'время окончания съёмки'} value={timeEnd} onChange={(e) => {setTimeEnd(e.target.value)}}></MyTime>

          </Col>

      </Row>

      <MyInput placeholder={'место съёмки'} style={{marginTop: 20 + 'px'}} value={place} onChange={(e) => {setPlace(e.target.value)}}></MyInput>
      <MyInput placeholder={'контакты'} style={{marginTop: 20 + 'px'}} value={contacts} onChange={(e) => {setContacts(e.target.value)}}></MyInput>

      <MyTextArea placeholder={'условия съёмки'} style={{marginTop: 20 + 'px'}} value={conditions} onChange={(e) => {setConditions(e.target.value)}}></MyTextArea>

      <MyButton style={{marginTop: 20 + 'px'}} onClick={() => {sendCardFilming()}}>Создать</MyButton>
















    </div>
  )
}

export default CreateFilming