import './Login-page.css'

// firebase

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

//

import { Row ,Col, Container } from "react-bootstrap"
import { useEffect, useState } from 'react'
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
          <Col className='d-flex flex-column justify-content-center align-items-center'>

            <div className="login-container">

            <div className="logo-container">
              <img className='logo' src={logoUtv} alt="logoUTV" />
            </div>
              <MyInput placeholder={'email'} type={'email'} style={{width: 300 + 'px', marginBottom: 10 + 'px'}} value={email} onChange={(e) => setEmail(e.target.value)}></MyInput>
              <MyInput placeholder={'password'} type={'password'} style={{width: 300 + 'px'}} value={password} onChange={(e) => {setPassword(e.target.value)}}></MyInput>
              <MyButton style={{width: 300 + 'px', marginTop: 20 + 'px'}} onClick={() => {submitLoginIn()}}>Войти</MyButton>
            </div>

          </Col>
        </Row>




    </Container>





  )
}

export default LoginPage