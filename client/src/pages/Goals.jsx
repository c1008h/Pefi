import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'

import { QUERY_ME } from '../utils/queries'

import Display from '../components/Goals/Displays/AllDisplay'
import GoalCarousel from '../components/Goals/GoalCarousel'
import { AllDisplay, CurrentDisplay, FutureDisplay, PreviousDisplay } from '../components/Goals/Displays'
import { authService } from '../utils/auth'
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap'

export default function Goals() {
  const [userData, setUserData] = useState()
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('current'); // Default tab

  const { data } = useQuery(QUERY_ME)

  useEffect(() => {
    if(data) {
      setUserData(data.me)
      setLoading(false)
    }
  }, [data])
  // console.log(userData || '')

  const token = authService.loggedIn() ? authService.getToken() : null;
  if(!token) {
      return <h2>Please login first</h2>
  }
  if(loading) {
      return <h2>LOADING...</h2>
  }
  const handleTabSelect = (selectedTab) => {
    setActiveTab(selectedTab);
  };

  return (
    <Container fluid={true}>
      <Row style={{justifyContent:'center'}}>
        <Col md={5}>
          <Tabs 
            defaultActiveKey={activeTab}
            onSelect={handleTabSelect}
            id='goal-tab'
            className='mb-3'
            justify
          >
            <Tab eventKey='previous' title='Previous'>Last Five</Tab>
            <Tab eventKey='current' title='Current'>Current</Tab>
            <Tab eventKey='future' title='Future'>Next Five</Tab>
            <Tab eventKey='ten' title='Ten'>Mid Preview</Tab>
          </Tabs>
        </Col>
      </Row>
      <Row>
        {/* <GoalCarousel userData={userData}/> */}
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
      </Row>
      {/* <Display userData={userData}/> */}
    </Container>
  )
}
