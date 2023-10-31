"use client"

import { useState, useEffect } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap'
import ModalTemplate from '@/components/Modal'

export default function Page() {
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [email, setEmail] = useState()
    const [isEditMode, setIsEditMode] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    
    const handleUpdateClick = () => {
        setIsEditMode(true);
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

    const handlePasswordChange = () => {
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
    
        handleClose(); 
    };

    return (
        <Container id='container'>
            <h2>Profile</h2>
            <Card id='form-card'>
                <Form 
                    // onSubmit={(e) => {
                    //     e.preventDefault()
                    //     handleSubmit(firstName, lastName, email)
                    // }}
                >
                    <Form.Group>
                        <Form.Label>First Name:</Form.Label>
                        { isEditMode ? 
                        (
                            <Form.Control
                                value={firstName}
                                // onChange={(e) => setFirstName(e.target.value)}
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
                                // onChange={(e) => setLastName(e.target.value)}
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
                                // onChange={(e) => setEmail(e.target.value)}
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
                            <ModalTemplate 
                                show={showPasswordModal}
                                handleClose={handleClosePasswordModal}
                                // userData={userData}
                            >
                                <Form>
                                    <Form.Group>
                                        <Form.Label>Current Password:</Form.Label>
                                        <Form.Control></Form.Control>
                                    </Form.Group>

                                    {/* <Form.Group>
                                        <Form.Label>New Password:</Form.Label>
                                        <Form.Control></Form.Control>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Confirm New Password:</Form.Label>
                                        <Form.Control></Form.Control>
                                    </Form.Group> */}
                                </Form>
                            </ModalTemplate>
                        ) : null}


                        <h4 className='text-btn' onClick={handleOpenDeleteModal}>Delete Account</h4>
                        {showDeleteModal ? (
                            <ModalTemplate
                                show={showDeleteModal}
                                handleClose={handleCloseDeleteModal}
                                // userData={userData}
                            >
                                <Form onSubmit={(e) => {
                                    e.preventDefault(e)
                                    checkingPass(currentPassword, userId)
                                }}>
                                    <Form.Group>
                                        <Form.Label>Why are you deleting your account?</Form.Label>
                                        <Select 
                                            options={deleteAccount}
                                            onChange={handleReasonSelect}
                                            required
                                        />
                                    </Form.Group>
                                    {other && (
                                        <Form.Group>
                                        <Form.Label>Other:</Form.Label>
                                        <Form.Control
                                            type='text'
                                            name='reason'
                                            value={reason}
                                            onChange={(e) => setReason(e.target.value)}
                                        />
                                        </Form.Group>
                                    )}
                                    <Form.Group>
                                        <Form.Label>To continue, please re-enter your password:</Form.Label>
                                        <Form.Control 
                                            type='password'
                                            name='currentPassword'
                                            value={currentPassword}
                                            onChange={(e) => setCurrentPassword(e.target.value)}
                                            required
                                            disabled={isPasswordCorrect}
                                        />
                                        <Button
                                            onClick={() => checkingPass(currentPassword, userId)}
                                        >{!isPasswordCorrect? 'Verify Password':'Verified!'}</Button>
                                    </Form.Group>
                                    {isPasswordCorrect ? (
                                        <Form.Group>
                                            <Form.Check
                                                type="checkbox"
                                                label="I understand that my profile and account information will be deleted from the site."
                                                checked={isAgreed}
                                                onChange={() => setIsAgreed(!isAgreed)}
                                            />
                                        </Form.Group>
                                    ): 
                                        null 
                                    }
                                </Form>
                            </ModalTemplate>
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