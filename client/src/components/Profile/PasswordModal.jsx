import {useState} from 'react'
import { Form } from 'react-bootstrap'
import ModalTemplate from '../modals/ModalTemplate';

export default function PasswordModal({ show, handleClose }) {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const handleChange = () => {
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
        handleClose(); 
    };

    return (
        <ModalTemplate 
            title={"Change Password"}
            change={"Update"}
            show={show}
            handleClose={handleClose}
            handleChange={handleChange}
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
    )
}
