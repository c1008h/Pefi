import FinanceForm from '../components/Finance/FinanceForm'; // Corrected import path
import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries'
import { authService } from '../utils/auth';
import PleaseLogin from '../components/PleaseLogin';
export default function Finance() {
  const [userData, setUserData] = useState({})
  const [loading, setLoading] = useState(true)
  const { data } = useQuery(QUERY_ME)
  useEffect(() => {
    if (data) {
      setUserData(data.me)
      setLoading(false)
    }
  }, [data])
  
  const token = authService.loggedIn() ? authService.getToken() : null;
  if(!token) {
      return <PleaseLogin/>
  }
  if(loading) {
      return <h2>LOADING...</h2>
  }
  return (
    <div>
      <h2>Finance</h2>
      <FinanceForm 
        userData={userData}
      />
    </div>
  )
}
