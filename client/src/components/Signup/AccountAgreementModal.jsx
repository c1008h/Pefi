import { useState } from 'react'
import { Container, Col, Row, Modal, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'; // Import PropTypes

export default function AccountAgreementModal({ show, onHide}) {
    const [agreed, setAgreed] = useState(false);
    const handleAgree = () => {
        setAgreed(true);
        onHide(); // Close the modal
    };
    // if (!agreed) {
    //     return null;
    // }

    return (
        <Modal show={show} onHide={onHide}>
            <Container style={{padding:'5%'}}>
                <Row>
                    <Col>
                        <h1>User Account Agreement (Terms of Use):</h1>
                        <p>
                            Welcome to Pefi, your personal financial goal planner! Pefi provides tools and resources designed to assist users in tracking and managing their financial goals. It&apos;s important to note that while Pefi aims to provide helpful insights and support, we cannot guarantee specific financial outcomes. Your individual financial circumstances, decisions, and external factors play a significant role in determining your financial results.           
                        </p>
                        <p>
                            By using Pefi, you acknowledge and accept that the app&apos;s features are provided for informational and planning purposes only. We are not responsible for any financial decisions or consequences resulting from the use of Pefi. It is recommended that users exercise caution, conduct thorough research, and consider seeking advice from qualified financial professionals before making any financial decisions.            
                        </p>
                        <p>
                            Pefi disclaims all liability for any actions, omissions, or decisions made by users based on information provided through the app. Users are solely responsible for evaluating the accuracy, completeness, and relevance of the information obtained through Pefi. We encourage users to exercise their judgment and consider their unique financial circumstances before making any financial choices.            
                        </p>
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

AccountAgreementModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired
}