import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'

import { QUERY_ME } from '../utils/queries'

import Display from '../components/Goals/Display'
import GoalCarousel from '../components/Goals/GoalCarousel'

export default function Goals() {
  const [userData, setUserData] = useState()
  const { data } = useQuery(QUERY_ME)

  useEffect(() => {
    if(data) {
      setUserData(data.me)
    }
  }, [data])
  console.log(userData)

  return (
    <div>
      <GoalCarousel userData={userData}/>
      <Display />
    </div>
  )
}
