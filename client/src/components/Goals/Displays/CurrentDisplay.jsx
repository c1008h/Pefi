import { useState } from 'react'
import PropTypes from 'prop-types'; 
import { ProgressBar } from 'react-bootstrap'

export default function CurrentDisplay({ years, userData }) {
  const [digital, setDigital] = useState()
  const [cash, setCash] = useState()
  const [saved, setSaved] = useState()
  const [invested, setInvested] = useState()
  console.log('currentDisplay:', userData.goalsGroup)

  return (
    <>
      {years.map((year) => (
        <div key={year}>
          <h2>{year}</h2>
          <div>
            <h3>Digital</h3>
            <ProgressBar />
          </div>
          <div>
            <h3>Cash</h3>
            <ProgressBar />
          </div>
          <div>
            <h3>Saved</h3>
            <ProgressBar />
          </div>
          <div>
            <h3>Invested</h3>
            <ProgressBar />
          </div>
        </div>
      ))}
    </>
  )
}
CurrentDisplay.propTypes = {
  userData: PropTypes.object.isRequired,
  years: PropTypes.array.isRequired
}