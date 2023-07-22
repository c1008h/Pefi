import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

export default function FinanceForm() {
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

    return (
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
                <Form.Control.Static>
                    {/* Display read-only information */}
                    {/* Replace 'digitalValue' with the actual value from your data */}
                    {/* digitalValue */}
                </Form.Control.Static>
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
                    <Form.Control.Static>
                    {/* Display read-only information */}
                    {/* Replace 'digitalValue' with the actual value from your data */}
                    {/* digitalValue */}
                </Form.Control.Static>
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
                <Form.Control.Static>
                {/* Display read-only information */}
                {/* Replace 'digitalValue' with the actual value from your data */}
                {/* digitalValue */}
            </Form.Control.Static>
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
                <Form.Control.Static>
                {/* Display read-only information */}
                {/* Replace 'digitalValue' with the actual value from your data */}
                {/* digitalValue */}
              </Form.Control.Static>
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
    )
}
