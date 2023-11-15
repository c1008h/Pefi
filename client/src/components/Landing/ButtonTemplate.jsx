import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const roundBtns = {
  borderRadius: 10,
  // marginRight:10,
  marginTop:10
}
const navyBtns = {
  marginTop: '2%'
}

export default function ButtonTemplate({ 
  title, 
  location, 
  btnStyle, 
  onClick, 
  disabled, 
  type 
}) {
  // const [isDisabled, setIsDisabled] = useState(disabled);

  // useEffect(() => {
  //   setIsDisabled(disabled);

  // }, [disabled])
  console.log('Is button disabled?', disabled);


  const buttonStyle = btnStyle === 'navy' ? navyBtns : (btnStyle === 'round' ? roundBtns : null);

  console.log(disabled)
  return (
    <>
      {location ? (
        <Link to={`/${location}`}>
          <button style={buttonStyle}>{title}</button>
        </Link>
      ) : (
        <button 
          type={type} 
          onClick={onClick} 
          style={{ ...buttonStyle, backgroundColor: disabled ? 'gray' : '#0066CC' }}
          disabled={disabled}
        >
          {title}
        </button>
      )}
    </>
  )
}
