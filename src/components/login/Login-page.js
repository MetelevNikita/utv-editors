import './Login-page.css'

// firebase

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

//

import { Row ,Col, Container } from "react-bootstrap"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';


// img

import logoUtv from './../../asset/logoUTV.svg'

// components


import MyButton from '../UI/MyButton'
import MyInput from '../UI/MyInput'





const LoginPage = ({isAuth}) => {

  const {auth, setAuth} = isAuth
  const navigate = useNavigate('')

  console.log(auth)


  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')





  const submitLoginIn = () => {
    const auth = getAuth()
    console.log(email, password)

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentioal) => {

        const user = userCredentioal.user
        console.log(user)
        setAuth(true)
        navigate('/main')

      })
      .catch((error) => {
        console.log(error, "ERROR")
      })


    setEmail('')
    setPassword('')
  }


  return(


    <Container fluid>

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