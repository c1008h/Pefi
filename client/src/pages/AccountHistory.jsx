import { useState, useEffect } from 'react'
import { useMutation, useQuery } from '@apollo/client';

import { QUERY_ME } from '../utils/queries'
import { authService } from '../utils/auth';

export default function AccountHistory() {
    const [userData, setUserData] = useState()
    const { data } = useQuery(QUERY_ME)
    const [loading, setLoading] = useState(false)
    const [expense, setExpense] = useState()
    const [income, setIncome] = useState()
    
console.log(userData)
    useEffect(() => {
        if (data) {
            setUserData(data.me)
            setLoading(false)
        }
    }, [data])
    
    const token = authService.loggedIn() ? authService.getToken() : null;
    if(!token) {
        return <h2>Please login first</h2>
    }

    if(loading) {
        return <h2>LOADING...</h2>
    }

    return (
        <div>
        
        </div>
    )
}
