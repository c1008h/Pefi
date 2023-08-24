import {useState} from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import Select from 'react-select'
import { useMutation } from '@apollo/client'
import { deleteAccount } from '../../constants/deleting_reasons'
import { CHECK_PASSWORD, DELETE_USER } from '../../utils/mutations'

export default function DeleteAccountModal({ show, handleClose }) {
    const [currentPassword, setCurrentPassword] = useState('');
    const [confirm, setConfirm] = useState('')
    const [reason, setReason] = useState('')
    const [other, setOther] = useState(false)
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
    const checkingPass = async (currentPassword) => {
        try {
            await checkPassword({
                variales: {
                    password: currentPassword
                }
            })
            console.log('Correct password')
        } catch (err) {
            console.log('Error:', err)
        }
    }

    const handleDelete = async (user_id, email, reason,) => {
        setCurrentPassword('');    
        handleClose(); 
        try {
            await deleteUser({
                variables: {
                    user_id: user_id,
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
            <Form>
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
                    <Form.Control />
                </Form.Group>
            </Form>
            <h5>
                Are you sure? Your profile and retrieved account information will be deleted from our site
            </h5>
        </Modal.Body>
        <Modal.Footer style={{justifyContent:'space-between'}}>
        <Button variant="secondary" onClick={handleClose}>
            Close
        </Button>
        <Button variant="primary" onClick={checkingPass}>
            Delete Account
        </Button>
        </Modal.Footer>
    </Modal>
    )
}
