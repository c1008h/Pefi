import { Container, Col, Row } from 'react-bootstrap'
import '../style/footer.css'

export default function Footer() {
    // const style = {
    //     // position: 'fixed','
    //     display:'flex',
    //     position:'absolute',
    //     backgroundColor: '#003366',
    //     backgroundSize: 'cover',
    //     padding: '5%',
    //     bottom: '0',
    //     width: '100%',
    //     margin:'0',
    //     // height: '2.5rem',
    //     // justifyContent:'center'
    //     textAlign:'center'
    // }
    
    return (
        <footer>
            <Container>
                <Container>
                    <Row>
                        <Col>
                            <p>Contact</p>
                        </Col>
                        <Col>
                            <p>About Us</p>
                        </Col>
                        <Col>
                            <p>Product</p>
                        </Col>
                        <Col>
                            <p>Platform</p>
                        </Col>
                        <Col>
                            <p>Support</p>
                        </Col>
                        <Col>
                            <p>Company</p>
                        </Col>
                    </Row>
                </Container>

                <Container fluid='true' id='footer-text'><p>© Chris Hong 2023. All rights reserved.</p></Container>
            </Container>
        </footer>
    )
}
