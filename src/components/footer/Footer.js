import './Footer.css'
import { Container, Col, Row } from 'react-bootstrap'


// img

import UiTgSvg from '../UI/footer_imge/uiTgSvg'
import UiWaSvg from '../UI/footer_imge/uiWaSvg'


const Footer = () => {
  return(
    <Container>
      <Col>

        <Row className='mb-4'>

          <div className="footer-container">
            <div className="footer-box">


                <div className="footer-release">version 1.9</div>

                <Row className='d-flex justify-content-center mt-3 mb-3'>

                  <Col sm={2} md={2} xs={2} className='d-flex justify-content-center'> <a target='blank' href="https://api.whatsapp.com/send?phone=79899519063"><UiWaSvg style={{width: 33 +'px'}}></UiWaSvg></a> </Col>
                  <Col sm={2} md={2} xs={2} className='d-flex justify-content-center'> <a target='blank' href="https://t.me/MetelevNikita"><UiTgSvg></UiTgSvg></a></Col>
                </Row>

                <div className="footer-title">ТЕХНИЧЕСКАЯ ПОДДЕРЖКА: 8 989 951 90 63</div>
                <div className="footer-subtitle">© 2023 MetelevNikita. Все права защищены </div>

            </div>
          </div>

        </Row>

      </Col>
    </Container>

  )
}

export default Footer