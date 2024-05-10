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

  const {auth, setAuth} = isAuth
  const {authEmail, setAuthEmail} = authEmailLog
  const navigate = useNavigate('')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [modalAuth, setModalAuth] = useState(true)

  const submitLoginIn = () => {
    const userAuth = getAuth()
    signInWithEmailAndPassword(userAuth, email, password)
      .then((userCredentioal) => {
          const user = userCredentioal.user

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

        {(modalAuth === true) ? <></> : <ModalPageAuth ModalPageAuth={{modalAuth, setModalAuth}} modalDislikeImg={dislike} modalDislikeTitle={'Неправильный логин или пароль'} modalBtnTitle={'заново'}></ModalPageAuth>}

        <Row md={12} sm={12} xs={12} className='d-flex flex-column justify-content-center align-items-center'>
          <Col className='d-flex flex-column justify-content-center align-items-center' style={{marginTop: '150px'}}>


              <Col className='logo-container'><img className='logo' src={logoUtv} alt="logoUTV" /></Col>

              <Col md={4} sm={12} xs={12} className='mt-3'><MyInput placeholder={'email'} type={'email'} style={{width: '100%'}} value={email} onChange={(e) => setEmail(e.target.value)}></MyInput></Col>
              <Col md={4} sm={12} xs={12} className='mt-1'><MyInput placeholder={'password'} type={'password'} style={{width: '100%'}} value={password} onChange={(e) => {setPassword(e.target.value)}}></MyInput></Col>

              <Col md={8} sm={12} xs={12} className='d-flex flex-md-row flex-column justify-content-center align-items-center'>

                <Col md={3} sm={12} xs={12} className='mt-3'><MyButton style={{width: '100%'}} onClick={() => {submitLoginIn()}}>Войти</MyButton></Col>
                <Col md={3} sm={12} xs={12} className='mt-3'><Link to={'/registration'}><MyButton style={{width: '100%'}}>Регистрация</MyButton></Link></Col>

              </Col>



          </Col>
        </Row>




    </Container>





  )
}

export default LoginPage