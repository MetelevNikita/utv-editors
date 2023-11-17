import './Login-page.css'

//

import { Row ,Col, Container } from "react-bootstrap"

// img

import logoUtv from './../../asset/logoUTV.svg'

// components


import MyButton from '../UI/MyButton'
import LoginInput from './Login-input'



const LoginPage = () => {


  return(


    <Container fluid>


        <Row md={12} sm={12} xs={12} className='d-flex flex-column justify-content-center align-items-center'>
          <Col className='d-flex flex-column justify-content-center align-items-center'>

            <div className="login-container">

              <img className='login-logo' src={logoUtv} alt="" />


              <LoginInput placeholder={'login'} type={'email'} style={{borderLeft: '1px solid black', borderRight: '1px solid black', borderTop: '1px solid black', borderBottom: '1px solid black', borderRadius: '10px 10px 0px 0px'}}></LoginInput>
              <LoginInput placeholder={'password'} type={'password'} style={{borderLeft: '1px solid black', borderRight: '1px solid black', borderBottom: '1px solid black', borderRadius: '0px 0px 10px 10px'}}></LoginInput>


              <MyButton style={{width: 200 + 'px', marginTop: 20 + 'px'}}>Войти</MyButton>

            </div>

          </Col>
        </Row>




    </Container>





  )
}

export default LoginPage