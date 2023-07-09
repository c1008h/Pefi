import React, { useState, useEffect } from 'react';
import { DateCalendar } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

export const CalendarEl = (event) => {
    const [spend, setSpend] = useState([])
    const [currentMonth, setCurrentMonth] = useState(null)
    const [currentDay, setCurrentDay] = useState(null)
    const [currentYear, setCurrentYear] = useState(null)

    // const date = new Date()
    useEffect(() => {
        const date = new Date()
        setCurrentDay(date.getDate())
        setCurrentMonth(date.getMonth() + 1)
        setCurrentYear(date.getFullYear())

    },[])

    // console.log(date)

    // const expense = (e) => {
    //     console.log(e.target)
    // }
    console.log(currentMonth, currentDay, currentYear)

    function pickDate(e) {
        const selectedDateNode = e.target;
        // console.log(selectedDateNode)
        // If user clicks node that contains that class, update date
        if(selectedDateNode.classList.contains('MuiButtonBase-root')) {
            setCurrentDay(parseInt(e.target.textContent))
        } 
        // If clicks on button that contains that class, update year
        if (selectedDateNode.classList.contains('MuiPickersYear-yearButton')) {
          setCurrentYear(parseInt(e.target.textContent))
        }
        if (selectedDateNode.classList.contains('MuiSvgIcon-root')) {
            const testId = selectedDateNode.getAttribute('data-testid');
            if (testId === 'ArrowLeftIcon') {
                setCurrentMonth(currentMonth - 1)
            } else {
                setCurrentMonth(currentMonth + 1)
            }
        }
      }
    return (
        <DateCalendar
            onClick={(e) => pickDate(e)}
        />
    )
}