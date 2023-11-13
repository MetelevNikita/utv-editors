import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'


import { Container, Col, Row } from 'react-bootstrap'

// img

import logoUTV from './asset/logoUTV.svg'
import like from './asset/like.svg'
import dislike from './asset/dislike.svg'

import ui_camera from './asset/ui_camera.svg'
import ui_editor from './asset/ui_plenka.svg'
import ui_design from './asset/ui_design.svg'
import ui_tech from './asset/ui_prokat.svg'


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

import MenuButon from './components/UI/MenuButton'
import FormEditors from './components/forms/form-editors'





const App = () => {


  // modal


  const [modalActiveLike, setModalActiveLike] = useState(false)
  const [modalActiveDislike, setModaActiveDislike] = useState(false)


  return(

    <Container fluid='md'>
      <Row className='d-flex justify-content-center'>
        <Col sm={6} xs={12}>

        <div className="logo-container">

          <img className='logo' src={logoUTV} alt="logoUTV" />

        </div>

        <div className="logo-subtitle-box">

          <div className="logo-subtitle">СЕРВИС ЗАЯВОК НА РАЗРАБОТКУ ПРОЕКТА</div>

        </div>

        <div className="logo-description-box-box">

          <div className="logo-description">При заполнении заявки необходимо заполнять все поля,в случаи их не заполнения заявка не будет отправленна исполнителю</div>

        </div>

        <Row className='mt-5'>
          <Col md={6} sm={12} xs={12} className='d-flex flex-column justify-content-center align-items-center'>

              <MenuButon menuButtonImg={ui_camera} menuButtonTitle={'операторский отдел'}></MenuButon>

              <MenuButon menuButtonImg={ui_design} menuButtonTitle={'отдел дизайна'}></MenuButon>

          </Col>


          <Col md={6} sm={12} xs={12} className='d-flex flex-column justify-content-center align-items-center'>

              <MenuButon menuButtonImg={ui_editor} menuButtonTitle={'отдел видеомонтажа'}></MenuButon>

              <MenuButon menuButtonImg={ui_tech} menuButtonTitle={'технический отдел'}></MenuButon>

          </Col>




          <Col></Col>
        </Row>


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