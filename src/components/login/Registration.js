import {React, useEffect, useState} from 'react'

//

import { Row ,Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

// components

import MyButton from '../UI/MyButton'
import MyButtonBack from '../UI/MyButtonBack'
import MyInput from '../UI/MyInput'

const Registration = ({ registration, newUser }) => {

  const navigate = useNavigate()
  const { registrationUser, setRegistrationUser} = registration



  return (


    <Row className='d-flex flex-column align-items-center'>
        <Col md={6} className='d-flex flex-column justify-content-center' style={{marginTop: '100px', marginLeft: '10px', marginRight: '20px'}}>

        <Col style={{width: '100%', textAlign: 'center', textTransform: 'uppercase', fontSize: '28px', fontWeight: 'bold'}}>Форма регистрации на портале</Col>

        <Col md={12} sm={12} xs={12} className='mt-3'><MyInput style={{width: '100%'}} placeholder={'Имя'} value={registrationUser.name} onChange={(e) => {setRegistrationUser({...registrationUser, name: e.target.value})}}></MyInput></Col>
        <Col md={12} sm={12} xs={12} className='mt-3'><MyInput style={{width: '100%'}} placeholder={'Фамилия'} value={registrationUser.lastName} onChange={(e) => {setRegistrationUser({...registrationUser, lastName: e.target.value})}}></MyInput></Col>
        <Col md={12} sm={12} xs={12} className='mt-3'><MyInput style={{width: '100%'}} placeholder={'Почта для входа'} value={registrationUser.email} onChange={(e) => {setRegistrationUser({...registrationUser, email: e.target.value})}}></MyInput></Col>

        <Col className='mt-3' style={{fontSize: '12px', width: '100%'}}>Телегра ID обязателен для получяения сообщения об изменения статуса вашей заявки</Col>

        <Col md={12} sm={12} xs={12} className='mt-1'><MyInput style={{width: '100%'}} placeholder={'Телеграм ID'} value={registrationUser.tgId} onChange={(e) => {setRegistrationUser({...registrationUser, tgId: e.target.value})}}></MyInput></Col>
        <Col md={12} sm={12} xs={12} className='mt-3'><MyInput type={'password'} style={{width: '100%'}} placeholder={'Пароль'} value={registrationUser.password} onChange={(e) => {setRegistrationUser({...registrationUser, password: e.target.value})}}></MyInput></Col>


            <Col md={12} sm={12} xs={12} className='d-flex flex-md-row flex-column'>

              <Col md={6} sm={12} xs={12} className='mt-3'><MyButton onClick={() => {newUser()}}>Создать</MyButton></Col>
              <Col md={6} sm={12} xs={12} className='mt-3'><MyButtonBack onClick={() => {navigate('/')}}>Назад</MyButtonBack></Col>

            </Col>

        </Col>
    </Row>






  )
}

export default Registration