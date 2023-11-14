import React from 'react'
import { Link } from 'react-router-dom'

export default function ButtonTemplate({ title, location, onClick }) {
  const buttonStyle = {
    marginTop: '2%'
  }

  return (
    <>
      {location ? (
        <Link to={`/${location}`}>
          <button style={buttonStyle}>{title}</button>
        </Link>
      ) : (
        <button onClick={onClick} style={buttonStyle}>{title}</button>
      )}
    </>
  )
}
