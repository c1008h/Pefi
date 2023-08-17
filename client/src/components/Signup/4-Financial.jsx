import { useState } from 'react'
import PropTypes from 'prop-types'; // Import PropTypes

export default function Financial({handleSkip, handleNextStep}) {
  return (
    <div>
      Financial info
    </div>
  )
}
Financial.propTypes = {
    handleSkip: PropTypes.func.isRequired,
    handleNextStep: PropTypes.func.isRequired,
};