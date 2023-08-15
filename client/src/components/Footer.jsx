import { Container, Col, Row } from 'react-bootstrap'

export default function Footer() {
    const style = {
        // position: 'fixed','
        display:'flex',
        position:'relative',
        backgroundColor: '#003366',
        backgroundSize: 'cover',
        padding: '5%',
        bottom: '0',
        width: '100%',
        // height: '2.5rem',
        // justifyContent:'center'
        textAlign:'center'
    }
    const footerText = {
        textAlign: 'center',
        color:'white',
        justifyContent:'center',
        paddingTop:'3%'
    }
    
    return (
        <footer style={style}>
            <Container>
                <Container>
                    <Row>
                        <Col style={{float:'left'}}>
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

                <Container fluid='true' style={footerText}><p>© Chris Hong 2023. All rights reserved.</p></Container>
            </Container>
        </footer>
    )
}
