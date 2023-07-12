import React, { useState, useEffect } from 'react';
import { DateCalendar } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

export const CalendarEl = (event) => {
    const [spend, setSpend] = useState([])
    const [currentMonth, setCurrentMonth] = useState(null)
    const [currentDay, setCurrentDay] = useState(null)
    const [currentYear, setCurrentYear] = useState(null)
    // const [showButtons, setShowButtons] = useState(false)

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
        console.log(selectedDateNode)
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
            const path = selectedDateNode.querySelector('path')

            if (testId === 'ArrowLeftIcon' || (path && path.getAttribute('d').includes('M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z'))) {
                // setCurrentMonth(currentMonth - 1)
                setCurrentMonth((prevMonth) => (prevMonth - 1 === 0 ? 12 : prevMonth - 1));
            } else if (testId === 'ArrowRightIcon' || (path && path.getAttribute('d').includes('M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z'))) {
                // setCurrentMonth(currentMonth + 1)
                setCurrentMonth((prevMonth) => (prevMonth + 1 === 13 ? 1 : prevMonth + 1));
            } else {
                return
            }
        }
    }

    return (
        <div style={{flexDirection:'column'}}>
            <DateCalendar
                onClick={(e) => pickDate(e)}
            />
            <h2>{currentMonth}/{currentDay}/{currentYear}</h2>
        </div>

    )
}