import { useEffect, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap'
import PropTypes from 'prop-types'; 
import axios from 'axios'
import Select from 'react-select'
import { PlaidLink } from 'react-plaid-link';

export default function PlaidInput({ handleSubmit }) {
    const [institutions, setInstitutions] = useState([]);
    const [selectedInstitution, setSelectedInstitution] = useState(null);
    const [institutionOptions, setInstitutionOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [linkToken, setLinkToken] = useState(null);

    useEffect(() => {
        axios.post('http://localhost:3006/api/institutions')
        .then((response) => {
            setInstitutions(response.data)

            const options = response.data.institutions.map((data) => ({
                value: (data.name).toLowerCase(),
                label: data.name
            }))
            setInstitutionOptions(options)
        })
        .catch((err) => {
            console.error(err.message)
        })
    }, [])

    const handleSelectChange = (selectedOption) => {
        setSelectedInstitution(selectedOption);

        if (selectedInstitution) {
            searchInstitutionByName(selectedInstitution)
        }
    };

    const searchInstitutionByName = (institutionName) => {
        axios.post('http://localhost:3006/api/institutions/search', { name: institutionName})
        .then((response) => {
            const institutionId = response.data.institutionId
            console.log(`Institution ID: ${institutionId}`);
        })
        .catch((error) => {
            console.error(error.message)
        })
    }

    // const linkHandler = Plaid.create({
    //     onSuccess: function (public_token, metadata) {
    //         axios.post('http://localhost:3006/api/link/create')
    //         .then((response) => {
    //             console.log(response)
    //         })
    //         .catch((error) => {
    //             console.error(error.message)
    //         })

    //     },
    //     redirectUri: 'https://localhost:3006/plaid/callback',
    // })

    const handleConnectClick = () => {
        if (selectedInstitution) {
            setIsLoading(true);

            axios.post('http://localhost:3006/api/link/token/create')
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.error(error.message)
            })        
        }
    };  



    const handlePlaidSuccess = (publicToken, metadata) => {
        axios.post('http://localhost:3006/api/link/token/exchange', { publicToken })
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.error(error.message);
        });
    };
    
    const handlePlaidExit = () => {
        // Handle the exit event if the user cancels the linking process.
    };
    return (
        <Card>
            <Form>
                <Form.Group>
                    <Form.Label>Choose Institution:</Form.Label>
                    <Select 
                        options={institutionOptions} 
                        placeholder="Select an institution"
                        value={selectedInstitution}
                        onChange={handleSelectChange}
                    />
                    {linkToken && (
                        <PlaidLink
                            token={linkToken}
                            onSuccess={handlePlaidSuccess}
                            onExit={handlePlaidExit}
                        >Connect with Plaid</PlaidLink>
                    )}
                </Form.Group>

                <Button
                    // onClick={handleSubmit}
                    onClick={() => handleConnectClick()}
                    variant="primary"
                >
                    Connect with Plaid
                </Button>
            </Form>
        </Card>
    )
}

PlaidInput.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
};