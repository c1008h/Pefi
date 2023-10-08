import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'; 
import { ProgressBar, Container } from 'react-bootstrap'

export default function CurrentDisplay({ years, userData }) {
  const [goalsGroup, setGoalsGroup] = useState(userData?.goalsGroup || null)
  const [finance, setFinance] = useState(userData?.financeGroup || null)

  useEffect(() => {
    setGoalsGroup(userData?.goalsGroup || null);
    setFinance(userData?.financeGroup || null);
  }, [userData])

  console.log('user years:', years)
  console.log('currentDisplay:', goalsGroup)
  console.log('finance:', finance)
  // console.log((finance.digital/goalsGroup[0].digital)*100)

  // console.log((finance.digital / (goalsGroup && goalsGroup.length > 0 ? goalsGroup[0].digital : 0)) * 100)


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

          const digitalPercentage = (finance.digital / yearData.digital) * 100;
          const cashPercentage = (finance.cash / yearData.cash) * 100;
          const savedPercentage = (finance.saved / yearData.saved) * 100;
          const investedPercentage = (finance.invested / yearData.invested) * 100;

          return (
            <Container key={year} style={{ }}>
              <h2>{year} - {year + 1}</h2>
              <div className='progress-box'>
                <h3>Digital Goal: {goalsGroup[0].digital}</h3>
                <ProgressBar 
                  variant={digitalPercentage < 33 ? 'danger' 
                    : digitalPercentage > 33 && digitalPercentage < 66 ? 'warning' 
                    : 'success'} 
                  now={digitalPercentage} 
                  label={`${digitalPercentage.toFixed(2)}%`} 
                />
              </div>
              <div className='progress-box'>
                <h3>Cash</h3>
                <ProgressBar 
                  variant={cashPercentage < 33 ? 'danger' 
                    : cashPercentage > 33 && cashPercentage < 66 ? 'warning' 
                    : 'success'} 
                  now={cashPercentage} 
                  label={`${cashPercentage.toFixed(2)}%`} 
                />
              </div>
              <div className='progress-box'>
                <h3>Saved</h3>
                <ProgressBar 
                  variant={savedPercentage < 33 ? 'danger' 
                    : savedPercentage > 33 && savedPercentage < 66 ? 'warning' 
                    : 'success'} 
                  now={savedPercentage} 
                  label={`${savedPercentage.toFixed(2)}%`} 
                />
              </div> 
              <div className='progress-box'>
                <h3>Invested</h3>
                <ProgressBar 
                  variant={investedPercentage < 33 ? 'danger' 
                    : investedPercentage > 33 && investedPercentage < 66 ? 'warning' 
                    : 'success'} 
                  now={investedPercentage} 
                  label={`${investedPercentage.toFixed(2)}%`} 
                />
              </div>
            </Container>
          );
        } else {
          return (
            <Container key={year}>
              <h2>{year} - {year + 1}</h2>
              <p>No data available for this year</p>
            </Container>
          );        
        }
      })}
    </>
  )
}
CurrentDisplay.propTypes = {
  userData: PropTypes.object.isRequired,
  years: PropTypes.array.isRequired
}