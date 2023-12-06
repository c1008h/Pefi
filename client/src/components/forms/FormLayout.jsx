import React from 'react'
import { Container, Card } from 'react-bootstrap'
import PropTypes from 'prop-types';

export default function FormLayout({ title, innerTitle, children, styles }) {
  return (
    // <Container id='container' style={styles.formContainer}>

    <Container style={styles.formContainer}>
      <h2 style={styles.title}>{title}</h2>
      <Card  style={styles.card}>
      {/* <Card id='form-card' style={styles.card}> */}
          {innerTitle ? (<h2>{innerTitle}</h2>) : null}
          {children}
      </Card>
    </Container>
  )
}

FormLayout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  styles: PropTypes.shape({
    container: PropTypes.object,
    formContainer: PropTypes.object,
    title: PropTypes.object,
    card: PropTypes.object,  
  }).isRequired,
};

