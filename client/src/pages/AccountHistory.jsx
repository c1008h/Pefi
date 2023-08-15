import { useState, useEffect } from 'react'
import { useMutation, useQuery } from '@apollo/client';
import { REMOVE_EXPENSE, REMOVE_INCOME } from '../utils/mutations';
import { QUERY_ME } from '../utils/queries'
import { authService } from '../utils/auth';

import { Button, Container } from 'react-bootstrap'
import '../style/details.css'

export default function AccountHistory() {
    const { data } = useQuery(QUERY_ME)
    const [removeExpense] = useMutation(REMOVE_EXPENSE)
    const [removeIncome] = useMutation(REMOVE_INCOME)
    const [userData, setUserData] = useState()
    const [loading, setLoading] = useState(false)
    const [expense, setExpense] = useState()
    const [income, setIncome] = useState()
    const [combinedData, setCombinedData] = useState([]);
    const itemsPerPage = 25; 
    const [currentPage, setCurrentPage] = useState(1);
    console.log(userData)
    useEffect(() => {
        if (data) {
            const { me } = data
            setUserData(data.me)
            setExpense(data.me.expensesGroup)
            setIncome(data.me.incomesGroup)

            const combined = [
                ...me.expensesGroup.map(item => ({ ...item, type: 'Expense' })),
                ...me.incomesGroup.map(item => ({ ...item, type: 'Income' }))
            ].sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date
    
            console.log('combined', combined)
            setCombinedData(combined);
        }
    }, [data])
    const handleDelete = async (_id, type) => {
        console.log(_id, type)
        try {
            if (type === 'Expense') {
                await removeExpense({ variables: { _id: _id } });
            } else if (type === 'Income') {
                await removeIncome({ variables: { _id: _id } });
            }

            // Update cache to reflect the changes
            // const updatedCombinedData = combinedData.filter(item => item._id !== _id);
            // setCombinedData(updatedCombinedData);
            setCombinedData(combinedData => combinedData.filter(item => item._id !== _id || item.type !== type));

        } catch (error) {
            console.log('Error:', error);
        }
    };
    const token = authService.loggedIn() ? authService.getToken() : null;
    if(!token) {
        return <h2>Please login first</h2>
    }
    if(loading) {
        return <h2>LOADING...</h2>
    }
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = combinedData.slice(indexOfFirstItem, indexOfLastItem);
    // console.log(currentItems)

    return (
        <Container fluid='true' style={{justifyContent:'center', textAlign:'center'}} className='container'>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Type</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((item) => (
                        <tr key={item._id} className={item.type === 'Expense' ? 'type-show Expense' : 'type-show Income'}>
                            <td>{item.date}</td>
                            <td>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.amount)}</td>
                            <td>{item.type === 'Expense' ? 'Expense' : 'Income'}</td>
                            <td>{item.category}</td>
                            <td>
                                <Button 
                                    variant='secondary'
                                    onClick={() => handleDelete(item._id, item.type)}
                                >X
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div>
                <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                    Previous Page
                </button>
                <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={indexOfLastItem >= combinedData.length}
                >
                    Next Page
                </button>
            </div>

        </Container>

      
    )
}
