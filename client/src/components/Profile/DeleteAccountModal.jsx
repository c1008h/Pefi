import { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import Select from 'react-select'
import { useMutation } from '@apollo/client'
import { deleteAccount } from '../../constants/deleting_reasons'
import { CHECK_PASSWORD, DELETE_USER } from '../../utils/mutations'
import PropTypes from 'prop-types'; // Import PropTypes

export default function DeleteAccountModal({ show, handleClose, userData }) {
    const [currentPassword, setCurrentPassword] = useState('');
    const [isAgreed, setIsAgreed] = useState(false); 
    const [reason, setReason] = useState('')
    const [other, setOther] = useState(false)
    const [isPasswordCorrect, setIsPasswordCorrect] = useState(false); 
    const [userId, setUserId] = useState(userData?._id || '')
    const [email, setEmail] = useState(userData?.email || '')
    const [deleteUser] = useMutation(DELETE_USER)
    const [checkPassword] = useMutation(CHECK_PASSWORD)

    const handleReasonSelect = (selectedOption) => {
        const selectedReason = selectedOption.value;
    
        if (selectedReason === 'other (specify)') {
          setReason(''); 
          setOther(true)
        } else {
          setReason(selectedReason); 
          setOther(false)
        }
    };
    const checkingPass = async (currentPassword, userId) => {
        if (!currentPassword) {
            alert('Failed to submit delete request! Please fill all requested fields!')
        }
        try {
            await checkPassword({
                variables: {
                    _id: userId,
                    password: currentPassword
                }
            })
            console.log('Correct password')
            setIsPasswordCorrect(true)
        } catch (err) {
            console.log('Error:', err)
            setIsPasswordCorrect(false)
        }
    }

    const handleDelete = async (userId, email, reason,) => {
        if (!reason) {
            alert('Failed to submit delete request! Please fill all requested fields!')
        }

        setCurrentPassword('');    
        handleClose(); 
        try {
            await deleteUser({
                variables: {
                    user_id: userId,
                    email: email,
                    reason: reason
                }
            })
        } catch (err) {
            console.log('Error:', err)
        }
    
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title><h2>Delete Account</h2></Modal.Title>
            </Modal.Header>
        <Modal.Body>
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
        </Modal.Body>
        <Modal.Footer style={{justifyContent:'space-between'}}>
        <Button variant="secondary" onClick={handleClose}>
            Close
        </Button>
        <Button variant="primary" 
            onClick={() => {
                if (isPasswordCorrect && isAgreed) {
                    handleDelete(userId, email, reason)
                } else {
                    if (!isAgreed) {
                        alert('Please acknowledge that you understand the consequences of account deletion.')
                    } else {
                        alert('Password is incorrect')
                    }
                }
            }}
            disabled={!isPasswordCorrect || !isAgreed}
        >
            Delete Account
        </Button>
        </Modal.Footer>
    </Modal>
    )
}

DeleteAccountModal.propTypes = {
    userData: PropTypes.object.isRequired,
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired
}