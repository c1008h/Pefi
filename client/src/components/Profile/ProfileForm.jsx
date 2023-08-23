import { useState } from 'react';
import PasswordModal from './PasswordModal';
import DeleteAccountModal from './DeleteAccountModal';
import PropTypes from 'prop-types'; // Import PropTypes
import { Container, Card, Form, Button } from 'react-bootstrap'
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../../utils/mutations';
import '../../style/profile.css'

export default function ProfileForm({userData}) {
    const [firstName, setFirstName] = useState(userData.firstName || '')
    const [lastName, setLastName] = useState(userData.lastName || '')
    const [email, setEmail] = useState(userData.email)
    const [password, setPassword] = useState()
    const [isEditMode, setIsEditMode] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false)

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
    const handleOpenDeleteModal = () => {
        setShowDeleteModal(true)
    }
    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false)
    }
      
    return (
        <Container id='container'>
            <h2>Profile</h2>
            <Card id='form-card'>
                <Form 
                    onSubmit={(e) => {
                        e.preventDefault()
                        handleSubmit(firstName, lastName, email)
                    }}
                >
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
                    <div id='text-btn-container'>
                        <h4 className='text-btn' onClick={handleOpenPasswordModal}>Change Password</h4>
                        {showPasswordModal ? (
                            <PasswordModal 
                                show={showPasswordModal}
                                handleClose={handleClosePasswordModal}
                            />
                        ) : null}
                        <h4 className='text-btn' onClick={handleOpenDeleteModal}>Delete Account</h4>
                        {showDeleteModal ? (
                            <DeleteAccountModal
                                show={showDeleteModal}
                                handleClose={handleCloseDeleteModal}
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