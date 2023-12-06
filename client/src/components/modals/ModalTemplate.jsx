import { Modal, Button } from 'react-bootstrap'

export default function ModalTemplate({ show, title, change, handleChange, handleClose, children, primaryButtonDisabled = false}) {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
            <Modal.Footer style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="secondary" onClick={handleClose} >
                    Close
                </Button>
                <Button variant="primary" onClick={handleChange} disabled={primaryButtonDisabled}>
                    {change}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
