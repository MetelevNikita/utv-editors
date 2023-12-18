import './main.css'
import 'bootstrap/dist/css/bootstrap.min.css'


import { Container, Col, Row } from 'react-bootstrap'
import app from './firebaseApp'
import { useNavigate } from 'react-router-dom'


// img

import logoUTV from './asset/logoUTV.svg'
import like from './asset/like.svg'
import dislike from './asset/dislike.svg'

import ui_camera from './asset/ui_camera.svg'
import ui_editor from './asset/ui_plenka.svg'
import ui_design from './asset/ui_design.svg'
import ui_tech from './asset/ui_prokat.svg'


import usersList from './server/usersList'
import userPrice from './server/userPrice'
import programType from './server/programType'

// components

import Footer from './components/footer/Footer'
import ModalPageLike from './components/modalpage/Modal-page-like'
import ModalPageDislike from './components/modalpage/Modal-page-dislike'


//

import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'




// components


import MenuButon from './components/UI/MenuButton'
import FormEditors from './components/forms/form-editors'
import FormDesign from './components/forms/form-design'
import FormTech from './components/forms/form-tech'


// operator
import PlanFilming from './components/forms/operator/plan-filming'
import CreateFilming from './components/forms/operator/create-filming'
import ScheludeFilming from './components/forms/operator/schedule-filming'


// svg

import UiCameraSvg from './components/UI/menu_image/uiCameraSvg'
import UiTechSvg from './components/UI/menu_image/uiTechSvg'
import UiEditingSvg from './components/UI/menu_image/uiEditingSvg'
import UiDesignSvg from './components/UI/menu_image/uiDesignSvg'
import CardFilming from './components/forms/operator/card-filming'
import EditFilming from './components/forms/operator/edit-filming'







const Main = ({isAuth, authEmailLog}) => {



  // modal


  const [modalActiveLike, setModalActiveLike] = useState(false)
  const [modalActiveDislike, setModaActiveDislike] = useState(false)
  const [menuTitle, setMenuTitle] = useState('КАТЕГОРИЯ')

  const {auth, setAuth} = isAuth
  const {authEmail, setAuthEmail} = authEmailLog
  const navigate = useNavigate()


  useEffect(() => {
    if (auth === false) {
      return navigate('/')
    }
  }, [])



  const submitMenu = (e) => {

    setMenuTitle(e.target.value)

    window.scrollTo({
      top: 950,
      behavior: "smooth",
    });


  }




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

          <div className="logo-description">при заполнении заявки необходимо заполнять все поля,в случаи их не заполнения заявка не будет отправленна исполнителю</div>

        </div>

        <Row className='mt-5 mb-5'>
          <Col md={6} sm={12} xs={12} className='d-flex flex-column justify-content-center align-items-center'>

              <Link to={`schedule`} value={'операторский отдел'} onClick={submitMenu}><MenuButon className="menu-button" value={'операторский отдел'} link={{menuTitle, setMenuTitle}}>{<UiCameraSvg className='logo-color'/>}{'операторский отдел'}</MenuButon></Link>

              <Link to={`design`} value={'операторский отдел'}><MenuButon className="menu-button" value={'отдел дизайна'}  onClick={submitMenu}>{<UiDesignSvg className='logo-color'/>}{'отдел дизайна'}</MenuButon></Link>

          </Col>


          <Col md={6} sm={12} xs={12} className='d-flex flex-column justify-content-center align-items-center'>

              <Link to={`editing`} value={'операторский отдел'}><MenuButon className="menu-button" value={'отдел видеомонтажа'} onClick={submitMenu}> {<UiEditingSvg className='logo-color'/>}{'отдел видеомонтажа'}</MenuButon></Link>

              <Link to={`technical`} value={'операторский отдел'}><MenuButon className="menu-button" value={'технический отдел'} onClick={submitMenu}> {<UiTechSvg className='logo-color'/>}{'технический отдел'}</MenuButon></Link>

          </Col>

        </Row>


        <Row className='mt-5'>
          <Col>

          <div className="form-theme-title">{menuTitle}</div>

          <Routes>


                <Route path={`/editing`} element={<FormEditors modalLike = {{modalActiveLike, setModalActiveLike}} modalDisLike = {{modalActiveDislike, setModaActiveDislike}}></FormEditors>}></Route>

                <Route path={`/schedule`} element={<ScheludeFilming authEmailLog={{authEmail, setAuthEmail}}></ScheludeFilming>}></Route>

                <Route path={`/technical`} element={<FormTech modalTechLike = {{modalActiveLike, setModalActiveLike}} modalTechDislike={{modalActiveDislike, setModaActiveDislike}}></FormTech>}></Route>

                <Route path={`/design`} element={<FormDesign modalDesLike={{modalActiveLike, setModalActiveLike}} modalDesDislike={{modalActiveDislike, setModaActiveDislike}}></FormDesign>}></Route>


                {/* operator routing */}

                <Route path={'schedule/plan'} element={<PlanFilming modalOperLike = {{modalActiveLike, setModalActiveLike}} modalOperDislike={{modalActiveDislike, setModaActiveDislike}}></PlanFilming>}></Route>
                <Route path={`schedule/create`} element={<CreateFilming modalOperLike = {{modalActiveLike, setModalActiveLike}} modalOperDislike={{modalActiveDislike, setModaActiveDislike}}></CreateFilming>}></Route>
                <Route path={`schedule/:id`} element={<CardFilming authEmailLog={{authEmail, setAuthEmail}}></CardFilming>}></Route>
                <Route path={`schedule/edit/:id`} element={<EditFilming modalOperLike = {{modalActiveLike, setModalActiveLike}} modalOperDislike={{modalActiveDislike, setModaActiveDislike}}></EditFilming>}></Route>


          </Routes>




          </Col>
        </Row>





        <Footer></Footer>


            <ModalPageLike like={{modalActiveLike, setModalActiveLike}} modalLikeImg={like} modalLikeTitle={'ЗАЯВКА ОТПРАВЛЕНА'} modalBtnTitle={'СПАСИБО'}></ModalPageLike>

            <ModalPageDislike dislike={{modalActiveDislike, setModaActiveDislike}} modalDislikeImg={dislike} modalDislikeTitle={'заполните все поля'} modalBtnTitle={'Продолжить'}></ModalPageDislike>


        </Col>
      </Row>
    </Container>


  )
}


export default Main