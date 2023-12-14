import './Footer.css'
import { Container, Col, Row } from 'react-bootstrap'


const Footer = () => {
  return(
    <Container>
      <Col>

        <Row>

          <div className="footer-container">
            <div className="footer-box">


                <div className="footer-release">release 1.0</div>

                <div className="footer-title">ТЕХНИЧЕСКАЯ ПОДДЕРЖКА: 8 989 951 90 63</div>
                <div className="footer-subtitle">Производство Метелев Никита </div>

            </div>
          </div>

        </Row>

      </Col>
    </Container>

  )
}

export default Footer