import { useState } from 'react'
import PropTypes from 'prop-types'; 
import { ProgressBar, Container, Col, Row } from 'react-bootstrap'

export default function CurrentDisplay({ years, userData }) {
  const [digital, setDigital] = useState()
  const [cash, setCash] = useState()
  const [saved, setSaved] = useState()
  const [invested, setInvested] = useState()
  const [goalsGroup, setGoalsGroup] = useState(userData?.goalsGroup || null)
  const [finance, setFinance] = useState(userData?.financeGroup || null)

  console.log('user years:', years)
  console.log('currentDisplay:', goalsGroup)
  console.log('finance:', finance)
  console.log((finance.digital/goalsGroup[0].digital)*100)
  const getDataForYear = (year) => {
    if (goalsGroup && goalsGroup.length > 0) {
      const yearData = goalsGroup.find((item) => item.year === year);
      console.log(yearData);
      return yearData || {};
    }
    return {};
  }

  return (
    <>
      {years.map((year) => {
        const yearData = getDataForYear(year);

        if (yearData) {
          return (
            <Container key={year} style={{ }}>
              <h2>{year} - {year + 1}</h2>
              <div className='progress-box'>
                <h3>Digital</h3>
                <ProgressBar 
                  variant={(finance.digital/yearData.digital)*100 < 33 ? 'danger' 
                    : (finance.digital/yearData.digital)*100 > 33 && (finance.digital/yearData.digital)*100 < 66 ? 'warning' 
                    : 'success'} 
                  now={(finance.digital/yearData.digital)*100} 
                  label={`${(finance.digital/yearData.digital) * 100}%`} 
                />
              </div>
              <div className='progress-box'>
                <h3>Cash</h3>
                <ProgressBar 
                  variant={(finance.cash/yearData.cash)*100 < 33 ? 'danger' 
                    : (finance.cash/yearData.cash)*100 > 33 && (finance.cash/yearData.cash)*100 < 66 ? 'warning' 
                    : 'success'} 
                  now={(finance.cash/yearData.cash)*100} 
                  label={`${(finance.cash/yearData.cash)*100}%`} 
                />
              </div>
              <div className='progress-box'>
                <h3>Saved</h3>
                <ProgressBar 
                  variant={(finance.saved/yearData.saved)*100 < 33 ? 'danger' 
                    : (finance.saved/yearData.saved)*100 > 33 && (finance.saved/yearData.saved)*100 < 66 ? 'warning' 
                    : 'success'} 
                  now={(finance.saved/yearData.saved)*100} 
                  label={`${(finance.saved/yearData.saved)*100}%`} 
                />
              </div> 
              <div className='progress-box'>
                <h3>Invested</h3>
                <ProgressBar 
                  variant={(finance.invested/yearData.invested)*100 < 33 ? 'danger' 
                    : (finance.invested/yearData.invested)*100 > 33 && (finance.invested/yearData.invested)*100 < 66 ? 'warning' 
                    : 'success'} 
                  now={(finance.invested/yearData.invested)*100} 
                  label={`${(finance.invested/yearData.invested)*100}%`} 
                />
              </div>
            </Container>
          );
        } else {
          return null; // Skip rendering for years without data
        }
      })}
    </>
  )
}
CurrentDisplay.propTypes = {
  userData: PropTypes.object.isRequired,
  years: PropTypes.array.isRequired
}