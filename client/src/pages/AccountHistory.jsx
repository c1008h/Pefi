import { useState, useEffect, useMemo } from 'react'
import { useMutation, useQuery } from '@apollo/client';

import { QUERY_ME } from '../utils/queries'
import { authService } from '../utils/auth';

import { Button } from 'react-bootstrap'
// import { useReactTable, getCoreRowModel, getPaginationRowModel, getSortedRowModel } from '@tanstack/react-table'
import '../style/details.css'

export default function AccountHistory() {
    const [userData, setUserData] = useState()
    const { data } = useQuery(QUERY_ME)
    const [loading, setLoading] = useState(false)
    const [expense, setExpense] = useState()
    const [income, setIncome] = useState()
    const [combinedData, setCombinedData] = useState([]);
    const itemsPerPage = 25; 
    const [currentPage, setCurrentPage] = useState(1);

    // const tableInstance = useReactTable({
    //     columns, 
    //     data, 
    //     getCoreModel: getCoreRowModel(), 
    //     getPaginationRowModel: getPaginationRowModel(), 
    //     getSortedRowModel: getSortedRowModel(), 
    // })


    // console.log(userData)

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
    // console.log('income', income)
    // console.log('expense', expense)
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
        <div className='container'>
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
                    {currentItems.map((item, index) => (
                        <tr key={index}>
                            <td>{item.date}</td>
                            <td>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.amount)}</td>
                            <td>{item.type === 'Expense' ? 'Expense' : 'Income'}</td>
                            <td>{item.category}</td>
                            <td><Button>X</Button></td>
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

        </div>

      
    )
}
