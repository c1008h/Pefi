import { useState } from 'react'
import PropTypes from 'prop-types'; 
import { ProgressBar } from 'react-bootstrap'

export default function CurrentDisplay({ years, userData }) {
  const [digital, setDigital] = useState()
  const [cash, setCash] = useState()
  const [saved, setSaved] = useState()
  const [invested, setInvested] = useState()
  const [goalsGroup, setGoalsGroup] = useState(userData?.goalsGroup || null)

  console.log('user years:', years)
  console.log('currentDisplay:', goalsGroup)

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
            <div key={year}>
              <h2>{year}</h2>
              <div>
                <h3>Digital</h3>
                <ProgressBar now={yearData.digital} label={`${yearData.digital}%`} />
              </div>
              <div>
                <h3>Cash</h3>
                <ProgressBar now={yearData.cash} label={`${yearData.cash}%`} />
              </div>
              <div>
                <h3>Saved</h3>
                <ProgressBar now={yearData.saved} label={`${yearData.saved}%`} />
              </div>
              <div>
                <h3>Invested</h3>
                <ProgressBar now={yearData.invested} label={`${yearData.invested}%`} />
              </div>
            </div>
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