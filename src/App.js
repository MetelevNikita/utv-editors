import './App.css'

// img

import logoUTV from './asset/logoUTV.svg'

//

import { Container, Col, Row  } from 'react-bootstrap'


// components

import MyInput from './components/MyInput'

//

import { useState } from 'react'


const App = () => {

  const [name, setName] = useState('')


  console.log(name)



  return(

    <Container className='d-flex'>
      <Row>
        <Col>

        <img className='logo' src={logoUTV} alt="logoUTV" />


        <div className='form-conttainer'>


        <MyInput title={'Ваше ФИО'} inputName = {{name, setName}}></MyInput>


        </div>





        </Col>
      </Row>
    </Container>

  )
}


export default App