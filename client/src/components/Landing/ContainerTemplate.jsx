import React from 'react'
import { Container, Row } from 'react-bootstrap'

export default function ContainerTemplate({ title, children }) {
  return (
    <Container fluid='true' className='content-containers'>
        <h2>{title}</h2>
        <Row>
            {children}
        </Row>
    </Container>
  )
}
