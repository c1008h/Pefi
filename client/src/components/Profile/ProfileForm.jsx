import { useState } from 'react';
import PasswordModal from './PasswordModal';
import PropTypes from 'prop-types'; // Import PropTypes
import { Container, Card, Form, Button, Modal } from 'react-bootstrap'
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../../utils/mutations';

export default function ProfileForm({userData}) {
    const [firstName, setFirstName] = useState(userData.firstName || '')
    const [lastName, setLastName] = useState(userData.lastName || '')
    const [email, setEmail] = useState(userData.email)
    const [password, setPassword] = useState()
    const [isEditMode, setIsEditMode] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);

    const [ updateUser ] = useMutation(UPDATE_USER)

    const handleUpdateClick = () => {
        setIsEditMode(true);
    };
    const handleCancelClick = () => {
        setFirstName(userData.firstName || '');
        setLastName(userData.lastName || '');
        setEmail(userData.email || '');
        setPassword(''); // Reset the password field
        setIsEditMode(false);
    };
    
    const handleSubmit = async (firstName, lastName, email) => {
        setIsEditMode(false); 
        if (!firstName || !lastName || !email) {
            console.error('Error: Required fields are empty');
            return;
        }

        try {
            await updateUser({
                variables: {
                    firstName: firstName,
                    lastName: lastName,
                    email: email
                }
            })
            
        } catch (error) {
            console.error('Error:', error)
        }
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
            <Form 
                onSubmit={(e) => {
                    e.preventDefault()
                    handleSubmit(firstName, lastName, email)
                    }}>
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
                    {isEditMode ? (
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
                    <Button onClick={handleUpdateClick}>Edit Profile</Button>
                )}
            </Form>
        </Card>
        </Container>
    )
}

ProfileForm.propTypes = {
    userData: PropTypes.object.isRequired
}