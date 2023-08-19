import { useState } from 'react'
import { Container, Row, Col, Modal, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'; // Import PropTypes

export default function PrivacyPolicyModal({ show, onHide }) {
    const [agreed, setAgreed] = useState(false);
    const handleAgree = () => {
        setAgreed(true);
        onHide(); // Close the modal
    };
    // if (!agreed) {
    //     return null;
    // }
    console.log('button works')
    return (
        <Modal show={show} onHide={onHide}>
            <Container>
                <Row>
                    <Col>
                        <h1>Privacy Policy:</h1>
                        <p>
                            Your privacy is of utmost importance to us. This Privacy Policy outlines how Pefi collects, uses, and safeguards your personal information. By using the app, you consent to the practices described in this policy. We collect various types of data to enhance your app experience and provide tailored financial insights.
                        </p>
                        <p>
                            Please note that while we implement security measures to protect your personal information, no method of data transmission or storage is entirely secure. Pefi disclaims liability for any unauthorized access to or use of your personal data. Users understand and accept that any data shared or transmitted via the app is at their own risk.
                        </p>
                        <p>
                            While Pefi is committed to providing accurate and reliable information, we cannot guarantee the accuracy, completeness, or timeliness of the data or insights provided. Users should exercise their judgment and verify information independently. Pefi disclaims all liability for inaccuracies or errors in the information presented.
                        </p>
                        <p>
                        Please consult with qualified legal and financial professionals for advice tailored to your specific situation. By using Pefi, users agree to indemnify and hold us harmless from any claims, damages, liabilities, or losses arising from their use of the app or reliance on its content.
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

PrivacyPolicyModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired
}