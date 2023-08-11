import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'; // Import PropTypes
import { useMutation } from '@apollo/client';
import { CREATE_FINANCE } from '../../utils/mutations'
// import { authService } from '../../utils/auth';
export default function FinanceForm({userData}) {
    const [digital, setDigital] = useState(userData.financeGroup.digital || 0)
    const [cash, setCash] = useState(userData.financeGroup.cash || 0)
    const [invested, setInvested] = useState(userData.financeGroup.invested || 0)
    const [saved, setSaved] = useState(userData.financeGroup.saved || 0)
    const [isEditMode, setIsEditMode] = useState(false);
    const [createFinance] = useMutation(CREATE_FINANCE)

    const handleUpdateClick = () => {
        setIsEditMode(true);
    };
    
    const handleCancelClick = () => {
        setIsEditMode(false);
    };

    const savingFinance = async (digital, cash, saved, invested) => {
        console.log('Saving finance:', digital, cash, saved, invested);

        setIsEditMode(false); 

        try {
            await createFinance({ 
                variables: { input: {
                digital: parseFloat(digital),
                cash: parseFloat(cash),
                invested: parseFloat(invested),
                saved: parseFloat(saved)
            } } })

            if(createFinance.error) { throw new Error('Something went wrong.')}

        } catch (error) {
            console.error('Error:'. error)
        }
    };

    return (
        <>
            <Form style={{padding:'10%'}} 
                onSubmit={(e) => {
                    e.preventDefault()
                    savingFinance(digital, cash, saved, invested)
                    }}>
                <Form.Group>
                    <Form.Label>Total Digital Money:</Form.Label>
                    {isEditMode ? (
                    <Form.Control 
                        type="number" 
                        placeholder="Enter Digital Money" 
                        name='digital'
                        value={digital}
                        onChange={e => setDigital(e.target.value)}
                    /> 
                    ) : (
                        <Form.Control 
                        type="number" 
                        name='digital'
                        disabled
                        value={digital}
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
                        value={cash}
                        onChange={e => setCash(e.target.value)}

                    />
                    ): (
                        <Form.Control 
                        type="number" 
                        name='cash'
                        disabled
                        value={cash}
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
                    value={invested}
                    onChange={e => setInvested(e.target.value)}

                />
                ) : (
                    <Form.Control 
                    type="number" 
                    name='invested'
                    value={invested}
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
                    value={saved}
                    onChange={e => setSaved(e.target.value)}

                />
                ): (
                    <Form.Control 
                    type="number" 
                    name='saved'
                    value={saved}
                    disabled
                    />
                )}
                </Form.Group>

                {isEditMode ? (
                <>
                    <Button type="submit">Save</Button>
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