import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'


import { Container, Col, Row } from 'react-bootstrap'

// img

import logoUTV from './asset/logoUTV.svg'
import like from './asset/like.svg'
import dislike from './asset/dislike.svg'


import usersList from './usersList'
import userPrice from './userPrice'
import programType from './programType'

// components

import Footer from './components/footer/Footer'
import ModalPageLike from './components/modalpage/Modal-page-like'
import ModalPageDislike from './components/modalpage/Modal-page-dislike'


//

import { useState, useEffect } from 'react'




// components

import FormEditors from './components/forms/form-editors'




const App = () => {


  // modal


  const [modalActiveLike, setModalActiveLike] = useState(false)
  const [modalActiveDislike, setModaActiveDislike] = useState(false)


  return(

    <Container fluid='md'>
      <Row className='d-flex justify-content-center'>
        <Col sm={12} xs={12}>

        <div className="logo-container">

        <img className='logo' src={logoUTV} alt="logoUTV" />

        </div>

        <div className="logo-subtitle-box">

        <div className="logo-subtitle">СЕРВИС ЗАЯВОК ВИДЕО-МОНТАЖА</div>

        </div>


        <FormEditors modalLike = {{modalActiveLike, setModalActiveLike}} modalDisLike = {{modalActiveDislike, setModaActiveDislike}}></FormEditors>


        <Footer></Footer>


            <ModalPageLike like={{modalActiveLike, setModalActiveLike}} modalLikeImg={like} modalLikeTitle={'ЗАЯВКА НА ПРОЕКТ ВИДЕО-МОНТАЖА ОТПРАВЛЕНА'} modalBtnTitle={'СПАСИБО'}></ModalPageLike>

            <ModalPageDislike dislike={{modalActiveDislike, setModaActiveDislike}} modalDislikeImg={dislike} modalDislikeTitle={'заполните все поля'} modalBtnTitle={'Продолжить'}></ModalPageDislike>


        </Col>
      </Row>
    </Container>


  )
}


export default App