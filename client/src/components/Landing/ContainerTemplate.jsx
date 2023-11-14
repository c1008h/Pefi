import React from 'react'
import { Container, Row } from 'react-bootstrap'

export default function ContainerTemplate({ title, children, style, row }) {
  // const containerClass = `content-containers ${style ? 'conditional-style' : ''}`;

  const bottomContainerStyle = {
    justifyContent: 'center',
    textAlign: 'center',
  };

  const topContainerStyle = {
    justifyContent:'center', textAlign:'center', padding: '5%', margin: '5%'
  }

  const containerClass = style === 'bottomContainer' ? bottomContainerStyle : (style === 'topContainer' ? topContainerStyle : null);
  
  return (
    <Container fluid='true' className='content-containers' style={containerClass}>
        <h2>{title}</h2>
        {!row ? (
          <Row>{children}</Row>
        ) : (
          children
        )}
    </Container>
  )
}
