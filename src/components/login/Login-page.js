import './Login-page.css'

// firebase

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

//

import { Row ,Col, Container } from "react-bootstrap"
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


// img

import logoUtv from './../../asset/logoUTV.svg'
import dislike from './../../asset/dislike.svg'

// components


import MyButton from '../UI/MyButton'
import MyInput from '../UI/MyInput'
import ModalPageAuth from '../modalpage/Modal-page-auth';





const LoginPage = ({isAuth, authEmailLog}) => {

  const { setAuth } = isAuth
  const { setAuthEmail } = authEmailLog
  const navigate = useNavigate('')

  const [email, setEmail] = useState('')
  const [modalPassAuth, setModalPassAuth] = useState(true)
  const [modalPassRepeat, setModalPassRepeat] = useState(true)
  const [authOk, setAuthOk] = useState(true)
  const [password, setPassword] = useState('')
  const [modalAuth, setModalAuth] = useState(true)

  const submitLoginIn = () => {
    const userAuth = getAuth()
    signInWithEmailAndPassword(userAuth, email, password)
      .then((userCredentioal) => {
          const user = userCredentioal.user

          console.log(user.email)

          setAuthEmail(user.email)
          sessionStorage.setItem('email', user.email)
          setAuth(true)
          setModalAuth(true)
          navigate('/main')


      })
      .catch((error) => {
        setModalAuth(false)
        console.log(error.code, "ERROR")
      })

  }



  return(


    <Container fluid>

        {(modalAuth === true) ? <></> : <ModalPageAuth ModalPageAuth={{modalAuth, setModalAuth}} ModalPassAuth={{modalPassAuth, setModalPassAuth}} AuthOk={{authOk, setAuthOk}} ModalPassRepeat={{modalPassRepeat, setModalPassRepeat}} modalDislikeImg={dislike} modalDislikeTitle={'Неправильный логин или пароль'} modalBtnTitle={'заново'}></ModalPageAuth>}

        <Row md={12} sm={12} xs={12} className='d-flex flex-column justify-content-center align-items-center'>
          <Col className='d-flex flex-column justify-content-center align-items-center' style={{marginTop: '150px'}}>


              <Col style={{width: '100%', height: '100px', overflow: 'hidden'}} className='d-flex justify-content-center align-items-center'><img className='logo' src={logoUtv} alt="logoUTV" /></Col>

              <Col md={4} sm={12} xs={12} className='mt-3'><MyInput placeholder={'email'} type={'email'} style={{width: '100%'}} value={email} onChange={(e) => setEmail(e.target.value)}></MyInput></Col>
              <Col md={4} sm={12} xs={12} className='mt-1'><MyInput placeholder={'password'} type={'password'} style={{width: '100%'}} value={password} onChange={(e) => {setPassword(e.target.value)}}></MyInput></Col>

              <Col md={8} sm={12} xs={12} className='d-flex flex-md-row flex-column justify-content-center align-items-center'>

                <Col md={3} sm={12} xs={12} className='mt-3 d-flex justify-content-center align-items-center'><MyButton style={{width: '90%'}} onClick={() => {submitLoginIn()}}>Войти</MyButton></Col>
                <Col md={3} sm={12} xs={12} className='mt-3 d-flex justify-content-center align-items-center'><Link style={{width: '90%'}} to={'/registration'}><MyButton>Регистрация</MyButton></Link></Col>

              </Col>



          </Col>
        </Row>

        <Row>
          <Col className='d-flex flex-column justify-content-center align-items-center'>
            
            <p className='mt-5'>Copyright © 2023 UTV</p>
            <p className='mt-1'>version 2.0</p>

          </Col>
        </Row>




    </Container>





  )
}

export default LoginPage