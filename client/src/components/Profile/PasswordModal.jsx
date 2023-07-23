import {useState} from 'react'
import { Modal, Button, Form } from 'react-bootstrap'

export default function PasswordModal({ show, handleClose }) {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const handlePasswordChange = () => {
        // Perform password validation and change logic here
        // ...
        // After handling the password change, you can reset the password-related states
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
    
        handleClose(); // Close the password change modal after saving
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Change Password</Modal.Title>
            </Modal.Header>
        <Modal.Body>
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
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
            Close
        </Button>
        {/* <Button variant="primary" onClick={handlePasswordChange}>
            Save Changes
        </Button> */}
        </Modal.Footer>
    </Modal>
    )
}
