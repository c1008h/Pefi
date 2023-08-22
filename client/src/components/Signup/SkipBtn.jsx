import React from 'react'
import { Button } from 'react-bootstrap'

export default function SkipBtn() {
  return (
    <Button
      onClick={() => handleSkip()}
      style={{float:'left'}}
    >Skip
    </Button>
  )
}
