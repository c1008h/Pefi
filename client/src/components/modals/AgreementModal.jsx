import React, { useState } from 'react'
import { Container, Col, Row, Modal, Button } from 'react-bootstrap'
import PropTypes from 'prop-types';

export default function AgreementModal({ show, onHide, agreement }) {
    const [agreed, setAgreed] = useState(false);

    const handleAgree = () => {
        setAgreed(true);
        onHide(); 
    };

    console.log("AGREEMENT", agreement)

    return (
        <Modal show={show} onHide={onHide}>
            <Container style={{padding:'5%'}}>
                <Row>
                    <Col>
                        <h1>{agreement.h1}</h1>
                        {agreement.description.map((field, index) => (
                            <p key={index}>{field}</p>
                        ))}

                    </Col>
                </Row>
            </Container>
            <Modal.Footer>
                {!agreed && (
                <Button variant="primary" onClick={handleAgree}>
                    Agree
                </Button>
                )}
            </Modal.Footer>
        </Modal>
    )
}

AgreementModal.propTypes = {
    agreement: PropTypes.shape({
        h1: PropTypes.string,
        description: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
  };
  
  