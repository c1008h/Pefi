import { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'; // Import PropTypes
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_FINANCE } from '../../utils/mutations';
import {QUERY_ME} from "../../utils/queries";
import { authService } from '../../utils/auth';
export default function FinanceForm({userData}) {
    const [digital, setDigital] = useState()
    const [cash, setCash] = useState()
    const [invested, setInvested] = useState()
    const [saved, setSaved] = useState()
    const [financialData, setFinancialData] = useState({})

    const [isEditMode, setIsEditMode] = useState(false);
    const { data } = useQuery(QUERY_ME)
    useEffect(() => {
        if (data) {
            setFinancialData(data.me.financeGroup)
            // setLoading(false)
        }
    },[data])
    console.log(financialData)

    const [createFinance] = useMutation(CREATE_FINANCE, {
        update(cache, {data: { createFinance }}) {
            const data = cache.readQuery({ query: QUERY_ME });
            const me = data ? data.me : null;
            if (!me) {
                return;
            }
            
            cache.writeQuery({
                query: QUERY_ME,
                data: { me: { ...me, financeGroup: [...me.financeGroup, createFinance] } },
            });
        }
    })


    const handleUpdateClick = () => {
        setIsEditMode(true);
    };
    
    const handleCancelClick = () => {
        setIsEditMode(false);
    };

    const handleSubmit = async (id, digital, cash, invested, saved) => {
        const token = authService.loggedIn() ? authService.getToken() : null;
        if(!token) {
            return false
        }        setIsEditMode(false); 

        try {
            await createFinance({ variables: { input: {
                digital: digital,
                cash: cash,
                invested: invested,
                saved: saved
            } } })

            if(createFinance.error) { throw new Error('Something went wrong.')}

        } catch (error) {
            console.error(error)
        }
    };
    return (
        <>
            <Form style={{padding:'10%'}}>
                <Form.Group>
                    <Form.Label>Total Digital Money:</Form.Label>
                    {isEditMode ? (
                    <Form.Control 
                        type="number" 
                        placeholder="Enter Digital Money" 
                        name='digital'
                        // value{}
                        onChange={(e) => setDigital(e.target.value)}
                    /> 
                    ) : (
                        <Form.Control 
                        type="number" 
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
                        onChange={(e) => setCash(e.target.value)}

                    />
                    ): (
                        <Form.Control 
                        type="number" 
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
                    onChange={(e) => setInvested(e.target.value)}

                />
                ) : (
                    <Form.Control 
                    type="number" 
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
                    onChange={(e) => setSaved(e.target.value)}

                />
                ): (
                    <Form.Control 
                    type="number" 
                    name='saved'
                    // value={formState.saved}
                    disabled
                    />
                )}
                </Form.Group>

                {isEditMode ? (
                <>
                    <Button onClick={() => handleSubmit(digital, cash, invested, saved)}>Save</Button>
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