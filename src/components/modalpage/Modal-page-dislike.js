
import './Modal-page-dislike.css'
import { Col, Container } from "react-bootstrap"
import MyButton from "../UI/MyButton"

const ModalPageDislike = ({dislike, ...props}) => {

  const {modalActiveDislike, setModaActiveDislike} = dislike


  return(
    <Container>
      <Col>

        <Col>
          <div className={modalActiveDislike ? "modal-like-page-bg" : "modal-like-page-bg modal-like-hidden"}>


              <div className="modal-like-page-container">
                <div className="modal-like-page-box">

                  <img className="modal-like-img" src={props.modalDislikeImg} alt="modal-img" />
                  <div className="modal-like-title">{props.modalDislikeTitle}</div>
                  <MyButton onClick={() => {setModaActiveDislike(false)}} style={{width: 175 + 'px', height: 44 + 'px' }}>{props.modalBtnTitle}</MyButton>

                </div>
              </div>


          </div>
        </Col>

      </Col>
    </Container>
  )
}

export default ModalPageDislike