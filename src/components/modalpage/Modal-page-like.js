
import './Modal-page-like.css'
import { Col, Container } from "react-bootstrap"
import MyButton from "../UI/MyButton"

const ModalPageLike = ({like, ...props}) => {

  const {modalActiveLike, setModalActiveLike} = like

  return(
    <Container>
      <Col>

        <Col>
          <div className={modalActiveLike ? "modal-like-page-bg" : "modal-like-page-bg modal-like-hidden"}>


              <div className="modal-like-page-container">
                <div className="modal-like-page-box">

                  <img className="modal-like-img" src={props.modalLikeImg} alt="modal-img" />
                  <div className="modal-like-title">{props.modalLikeTitle}</div>
                  <MyButton onClick={() => {setModalActiveLike(false)}} style={{width: 175 + 'px', height: 44 + 'px' }}>{props.modalBtnTitle}</MyButton>

                </div>
              </div>


          </div>
        </Col>

      </Col>
    </Container>
  )
}

export default ModalPageLike