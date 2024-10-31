import './Modal-page-auth.css'

//


import { Container, Col } from 'react-bootstrap'

// components

import MyButton from '../UI/MyButton'


const ModalPageAuth = ({ModalPageAuth, ModalPassAuth, ModalPassRepeat, AuthOk, ...props}) => {


  const { setModalAuth } = ModalPageAuth
  const { setModalPassAuth } = ModalPassAuth
  const { setModalPassRepeat } = ModalPassRepeat
  const { setAuthOk } = AuthOk




  const resetModal = () => {
    setModalAuth(true)
    setModalPassAuth(true)
    setAuthOk(true)
    setModalPassRepeat(true)

  }


  return(
    <Container>
      <Col>

        <Col>
          <div className="modal-auth-page-bg">


              <div className="modal-auth-page-container">
                <div className="modal-auth-page-box">

                  <img className="modal-auth-img" src={props.modalDislikeImg} alt="modal-img" />
                  <div className="modal-auth-title">{props.modalDislikeTitle}</div>
                  <MyButton onClick={() => {resetModal()}} style={{width: 175 + 'px', height: 44 + 'px' }}>{props.modalBtnTitle}</MyButton>

                </div>
              </div>


          </div>
        </Col>

      </Col>
    </Container>
  )
}

export default ModalPageAuth