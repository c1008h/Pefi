import React from 'react'
import { Button } from 'react-bootstrap'

export default function ContinueBtn() {
  return (
    <Button
      onClick={() => handleNextStep()}
      style={{float:'right'}}
    >Next
    </Button>
  )
}
