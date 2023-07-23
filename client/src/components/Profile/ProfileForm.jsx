import { useState } from 'react';
import PasswordModal from './PasswordModal';
import PropTypes from 'prop-types'; // Import PropTypes
import { Container, Card, Form, Button, Modal } from 'react-bootstrap'

export default function ProfileForm({userData}) {
    const [firstName, setFirstName] = useState(userData.firstName || '')
    const [lastName, setLastName] = useState(userData.lastName || '')
    const [email, setEmail] = useState(userData.email)
    const [password, setPassword] = useState()
    const [isEditMode, setIsEditMode] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);

    // console.log(userData.email)
    // console.log(email)
    const handleEditClick = () => {
        setIsEditMode(false);
    };
    const handleCancelClick = () => {
        // Restore the original user data when canceling the edit
        setFirstName(userData.firstName || '');
        setLastName(userData.lastName || '');
        setEmail(userData.email || '');
        setPassword(''); // Reset the password field
        setIsEditMode(false);
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();
        setIsEditMode(false); 
    };
    const handleOpenPasswordModal = () => {
        setShowPasswordModal(true);
    };
      
    const handleClosePasswordModal = () => {
        setShowPasswordModal(false);
    };
      
    return (
        <Container>
        <h2>Profile</h2>
        <Card style={{padding:'5%'}}>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>First Name:</Form.Label>
                    { isEditMode ? 
                    (
                        <Form.Control
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        /> 
                    ) : (
                        <Form.Control 
                            value={firstName}
                            disabled
                        />
                    )}
                </Form.Group>

                <Form.Group>
                    <Form.Label>Last Name:</Form.Label>
                    { isEditMode ? (
                    <Form.Control             
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    /> 
                    ) : (
                        <Form.Control 
                        value={lastName}
                        disabled
                    />
                    )}
                </Form.Group>
                <Form.Group>
                    <Form.Label>Email:</Form.Label>
                    { isEditMode ? (
                    <Form.Control 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    ) : (
                        <Form.Control 
                        value={email}
                        disabled
                    />
                    )}
                </Form.Group>
                <div>
                    <h4 onClick={handleOpenPasswordModal}>Change Password</h4>
                    {showPasswordModal ? (
                        <PasswordModal 
                            show={showPasswordModal}
                            handleClose={handleClosePasswordModal}
                        />
                    ) : null}
                </div>
                {isEditMode ? (
                <>
                    <Button type="submit">Save</Button>
                    <Button variant="secondary" onClick={handleCancelClick}>Cancel</Button>
                </>
                ) : (
                    <Button onClick={handleEditClick}>Edit Profile</Button>
                )}
            </Form>
        </Card>
        </Container>
    )
}

ProfileForm.propTypes = {
    userData: PropTypes.object.isRequired
}