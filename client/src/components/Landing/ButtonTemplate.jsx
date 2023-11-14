import React from 'react'
import { Link } from 'react-router-dom'

export default function ButtonTemplate({ title, location }) {
  return (
    <Link to={`/${location}`}>
      <button style={{marginTop:'2%'}}>{title}</button>
    </Link>
  )
}
