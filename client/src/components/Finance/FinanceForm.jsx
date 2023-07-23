import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'; // Import PropTypes

export default function FinanceForm({userData}) {
    const [isEditMode, setIsEditMode] = useState(false);
    const handleUpdateClick = () => {
        setIsEditMode(true);
    };
    
    const handleCancelClick = () => {
        setIsEditMode(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission logic here
        setIsEditMode(false); // Switch back to read-only mode after saving
    };
console.log(userData.finance)
    return (
        <>
            <Form>
                <Form.Group>
                    <Form.Label>Total Digital Money:</Form.Label>
                    {isEditMode ? (
                    <Form.Control 
                        type="number" 
                        placeholder="Enter Digital Money" 
                        name='digital'
                        // value={formState.email} 
                    /> 
                    ) : (
                        <Form.Control 
                        type="number" 
                        placeholder="Enter Digital Money" 
                        name='digital'
                        disabled
                        // value={formState.digital}
                        />
                    )}
                </Form.Group>

                <Form.Group>
                    <Form.Label>Total Cash:</Form.Label>
                    {isEditMode ? (

                    <Form.Control 
                        type="number" 
                        placeholder="Enter Cash" 
                        name='cash'
                    />
                    ): (
                        <Form.Control 
                        type="number" 
                        placeholder="Enter Cash" 
                        name='cash'
                        disabled
                        // value={formState.digital}
                        />
                    )}
                </Form.Group>

                <Form.Group>
                <Form.Label>Total Invested:</Form.Label>
                {isEditMode ? (

                <Form.Control 
                    type="text" 
                    placeholder="Enter Total Invested " 
                    name='invested'
                />
                ) : (
                    <Form.Control 
                    type="number" 
                    placeholder="Enter invested" 
                    name='invested'
                    // value={formState.digital}
                    disabled
                    />
                )}
                </Form.Group>

                <Form.Group>
                <Form.Label>Total Saved:</Form.Label>
                {isEditMode ? (

                <Form.Control 
                    type="text" 
                    placeholder="Enter Total Saved" 
                    name='saved'
                />
                ): (
                    <Form.Control 
                    type="number" 
                    placeholder="Enter saved Money" 
                    name='saved'
                    // value={formState.saved}
                    disabled
                    />
                )}
                </Form.Group>

                {isEditMode ? (
                <>
                    <Button onClick={handleSubmit}>Save</Button>
                    <Button onClick={handleCancelClick}>Cancel</Button>
                </>
                ) : (
                    <Button onClick={handleUpdateClick}>Update</Button>
                )}

            </Form>
        </>
        
    )
}

FinanceForm.propTypes = {
    userData: PropTypes.object.isRequired
}