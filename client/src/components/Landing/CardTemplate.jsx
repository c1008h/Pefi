import React from 'react'
import { Card, Col } from 'react-bootstrap'

export default function CardTemplate({ header, body, key }) {
    return (
        <Col key={key}>
            <Card>
                {header ? (
                    <Card.Header>{header}</Card.Header>
                ) : 
                    null
                }
                <Card.Body>{body}</Card.Body>
            </Card>
        </Col>
  )
}
