import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { QUERY_ME } from '../utils/queries'
import GoalCarousel from '../components/Goals/GoalCarousel'
import { authService } from '../utils/auth'
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap'
import '../style/goals.css'
import PleaseLogin from '../components/PleaseLogin'
import Loading from './Loading'

export default function Goals() {
  const [userData, setUserData] = useState()
  const [goals, setGoals] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('current'); 

  const { data } = useQuery(QUERY_ME)

  useEffect(() => {
    if(data) {
      setUserData(data.me)

      if(data.me.goalsGroup.length > 0){
        setGoals(data.me.goalsGroup)
      }
      setLoading(false)
    }
  }, [data])

  const token = authService.loggedIn() ? authService.getToken() : null;
  if(!token) {
      return <PleaseLogin/>
  }
  if(loading) {
      return <Loading />
  }
  const handleTabSelect = (selectedTab) => {
    setActiveTab(selectedTab);
  };

  return (
    <Container fluid={true}>
      <Row style={{justifyContent:'center'}}>
        <Col md={7}>
          <Tabs 
            defaultActiveKey={activeTab}
            onSelect={handleTabSelect}
            id='goal-tab'
            className='mb-3'
            justify
          >
            <Tab eventKey='previous' title='Previous'></Tab>
            <Tab eventKey='current' title='Current'></Tab>
            <Tab eventKey='future' title='Future'></Tab>
            <Tab eventKey='ten' title='Ten'></Tab>
          </Tabs>
        </Col>
      </Row>
      <Row style={{marginBottom:'5%'}}>
        {/* <GoalCarousel userData={userData}/> */}
        {goals !== null ? (
          <Col>
            {activeTab === 'current' && (
              <GoalCarousel userData={userData} layout='current' />
            )}
            {activeTab === 'previous' && (
              <GoalCarousel userData={userData} layout='previous' />
            )}
            {activeTab === 'future' && (
              <GoalCarousel userData={userData} layout='future' />
            )}
            {activeTab === 'ten' && (
              <GoalCarousel userData={userData} layout='ten' />
            )}
          </Col>
        ) : (
          <div>
            <p>You haven&rsquo;t set any financial goals yet.</p>
            <Link to='/signup'>Click here to add goals</Link>
          </div>
        )}
      </Row>
    </Container>
  )
}
