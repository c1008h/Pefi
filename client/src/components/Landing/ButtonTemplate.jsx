import React from 'react'
import { Link } from 'react-router-dom'

export default function ButtonTemplate({ title, location, btnStyle, onClick, disabled, type }) {
  const roundBtns = {
    borderRadius: 10,
    // marginRight:10,
    marginTop:10
  }
  const navyBtns = {
    marginTop: '2%'
  }
  const buttonStyle = btnStyle === 'navy' ? navyBtns : (btnStyle === 'round' ? roundBtns : null);

  return (
    <>
      {location ? (
        <Link to={`/${location}`}>
          <button style={buttonStyle}>{title}</button>
        </Link>
      ) : (
        <button type={type} onClick={onClick} style={buttonStyle} disabled={disabled ?? false}>{title}</button>
      )}
    </>
  )
}
