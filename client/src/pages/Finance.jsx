// import FinanceForm from '../components/Finance/FinanceForm'; // Corrected import path
import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries'
import { authService } from '../utils/auth';
import { CREATE_FINANCE } from '../utils/mutations'
import { useMutation } from '@apollo/client';
import { Loading, PleaseLogin, FormTemplate, FormLayout } from '../components/index';

export default function Finance() {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const { data } = useQuery(QUERY_ME);
  const [digital, setDigital] = useState(0);
  const [cash, setCash] = useState(0);
  const [invested, setInvested] = useState(0);
  const [saved, setSaved] = useState(0);
  const [isEditMode, setIsEditMode] = useState(false);
  const [createFinance] = useMutation(CREATE_FINANCE);

  const fields = [
    {
      label: 'Total Digital Money:', name: 'digital', type: 'number', value: digital, placeholder: 'Enter Digital Money',
      onChange: e => setDigital(e.target.value), editable: isEditMode,
    },
    {
      label: 'Total Cash:', name: 'cash', type: 'number', value: cash, placeholder: 'Enter Cash',
      onChange: e => setCash(e.target.value), editable: isEditMode,
    },
    {
      label: 'Total Invested:', name: 'invested', type: 'number', value: invested,
      editable: isEditMode, placeholder:"Enter Total Invested", onChange: e => setInvested(e.target.value)
    },
    {
      label: 'Total Saved:', name: 'saved', type: 'number', value: saved,
      editable: isEditMode, placeholder:"Enter Total Saved", onChange: e => setSaved(e.target.value)
    }
  ]

  useEffect(() => {
    if (data) {
      setUserData(data.me);
      setDigital(data.me?.financeGroup?.digital || 0);
      setCash(data.me?.financeGroup?.cash || 0);
      setInvested(data.me?.financeGroup?.invested || 0);
      setSaved(data.me?.financeGroup?.saved || 0);
      setLoading(false)
    }
  }, [data])
  
  const savingFinance = async (digital, cash, saved, invested) => {
    console.log('Saving finance:', digital, cash, saved, invested);

    setIsEditMode(false); 

    try {
      await createFinance({ 
        variables: {  
          input: {
            digital: parseFloat(digital),
            cash: parseFloat(cash),
            invested: parseFloat(invested),
            saved: parseFloat(saved)
          } 
        } 
      })

      if (createFinance.error) { throw new Error('Something went wrong.')}

    } catch (error) {
      console.error('Error:'. error)
    }
  };


  const token = authService.loggedIn() ? authService.getToken() : null;
  if(!token) return <PleaseLogin/>

  if (loading) return <Loading />
  
  return (
    <FormLayout title="Finance" styles={financeForm}>
      <FormTemplate 
        fields={fields}
        onSubmit={(formData) => {
          savingFinance(formData.digital, formData.cash, formData.saved, formData.invested)
        }}
      />
    </FormLayout>
  )
}

const financeForm = {
  
  formContainer: {
    paddingTop:'3%',
    marginBottom:'5%'
  },
  title: {

  },
  card: {
    padding:'3% 5% 3% 5%',
    margin: '3% 15%',
  }
  
}