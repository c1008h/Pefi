import React from 'react'
import { Link } from 'react-router-dom'
import { Income } from '../components/InputInfo/Income'
// import { Expenses } from '../components/Expenses'

export const InputInfo = () => {
    return (
        <>
            <h2>Answer these questions realistically so we can set a goal for you to reach your goals</h2>
            <div 
                style={{
                    display:'flex', 
                    flexDirection:'column',
                    alignItems:'center'
                }}>
                <Income />
                <button>Add Expenses</button>
                <Link to='/dashboard'>
                    <button>Submit</button>
                </Link>
            </div>
        </>
    )
}