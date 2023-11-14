import React from 'react'
import { Link } from "react-router-dom";

export default function PleaseLogin() {


  return (
    <div style={{height:'900px', background:'white', textAlign:'center', paddingTop:'5%'}}>
      <h2>Please login first!</h2>
      <Link to='/login'>Click here to login</Link>
    </div>
  )
}
