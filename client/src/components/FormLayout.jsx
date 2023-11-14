import React from 'react'
import { Container, Card } from 'react-bootstrap'

export default function FormLayout({ title, children }) {
  return (
    <Container id='container'>
        <h2>{title}</h2>
        <Card id='form-card'>
            {children}
        </Card>
    </Container>
  )
}
