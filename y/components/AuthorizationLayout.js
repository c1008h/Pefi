import React from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'

export default function AuthorizationLayout({ imageTitle, imageDescription, image, alt, title, children }) {
    const imageStyles = {
        objectFit: 'cover',
        width: '100%',
        height: '100%',
    };  

    return (
        <Container fluid='true'>
        <Row>
            <Col>
                <h1 style={{color:'white'}}>{imageTitle}</h1>
                <h5 style={{color:'white'}}>{imageDescription}</h5>
            </Col>
            <Col>
                <h1>{title}</h1>

                {/* <Form>
                    <h1>{title}</h1>

                </Form> */}
                {children}
            </Col>
        </Row>
        </Container>
    )
}
