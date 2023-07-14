import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { DateCalendar } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

export const CalendarEl = (event) => {
    const [value, setValue] = React.useState(dayjs('2022-04-17'));

    const [spend, setSpend] = useState([])

    const [currentMonth, setCurrentMonth] = useState(null)
    const [currentDay, setCurrentDay] = useState(null)
    const [currentYear, setCurrentYear] = useState(null)
    // const [showButtons, setShowButtons] = useState(false)
    // const [headerEl, setHeaderEl] = useState(null);

    // const headerEl = document.getElementById(':r1:-grid-label')
    // console.log(headerEl.innerHTML)

    useEffect(() => {
        const date = new Date()
        setCurrentDay(date.getDate())
        setCurrentMonth(date.getMonth() + 1)
        setCurrentYear(date.getFullYear())

    },[])

    // useEffect(() => {
    //     if (headerEl) {
    //       // Access the header's text content and update the month
    //       const monthLabel = headerEl.querySelector('h4').textContent;
    //       const month = new Date(Date.parse(monthLabel + ' 1, 2000')).getMonth() + 1;
    //       setCurrentMonth(month);
    //     }
    //   }, [headerEl]);
    //   function handleDateChange(date) {
    //     setCurrentDay(date.getDate());
    //     setCurrentMonth(date.getMonth() + 1);
    //     setCurrentYear(date.getFullYear());
    //   }
    //   function handleMonthChange(month) {
    //     setCurrentMonth(month);
    //   }
    // console.log(date)

    // const expense = (e) => {
    //     console.log(e.target)
    // }
    // console.log(currentMonth, currentDay, currentYear)
    function pickDate(e) {
        const selectedDateNode = e.target;
        // console.log(selectedDateNode)

        // console.log(headerEl)

        // If user clicks node that contains that class, update date
        if(selectedDateNode.classList.contains('MuiButtonBase-root')) {
            setCurrentDay(parseInt(e.target.textContent))
        } 
        // If clicks on button that contains that class, update year
        if (selectedDateNode.classList.contains('MuiPickersYear-yearButton')) {
          setCurrentYear(parseInt(e.target.textContent))
        }
        if (selectedDateNode.classList.contains('MuiSvgIcon-root')) {
        // if (selectedDateNode.classList.contains('MuiPickersArrowSwitcher-root')) {
            // console.log(headerEl)
            // console.log(selectedDateNode)
            // const findMonth = document.getElementByClassName('MuiPickersCalendarHeader-label')
            // console.log(findMonth.textContent)
            // console.log(e.target)
            // if (testId === 'ArrowLeftIcon' || (path && path.getAttribute('d').includes('M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z'))) {
            //     // setCurrentMonth(currentMonth - 1)
            //     setCurrentMonth((prevMonth) => (prevMonth - 1 === 0 ? 12 : prevMonth - 1));
            // } else if (testId === 'ArrowRightIcon' || (path && path.getAttribute('d').includes('M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z'))) {
            //     // setCurrentMonth(currentMonth + 1)
            //     setCurrentMonth((prevMonth) => (prevMonth + 1 === 13 ? 1 : prevMonth + 1));
            // } else {
            //     return
            // }
            // const arrow = selectedDateNode.getAttribute('data-mui-test');
            // const monthLabel = selectedDateNode.closest('.MuiPickersCalendarHeader-root')
            // .querySelector('.MuiPickersCalendarHeader-transitionContainer > div > h4').textContent;
              
            // if (arrow === 'keyboard-arrow-left') {
            //   setCurrentMonth((prevMonth) => (prevMonth - 1 === 0 ? 12 : prevMonth - 1));
            // } else if (arrow === 'keyboard-arrow-right') {
            //   setCurrentMonth((prevMonth) => (prevMonth + 1 === 13 ? 1 : prevMonth + 1));
            // } else {
            //   return;
            // }
        
            // console.log(monthLabel);
        }
    }
    function handleDateChange(newValue) {
        setValue(newValue)
        console.log(dayjs(value.$d).format('MM/DD/YYYY'))
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div style={{flexDirection:'column'}} components={['DateCalendar', 'DateCalendar']} label={'"year", "month" and "day"'}>
                <DateCalendar
                    // onClick={(date) => pickDate(date)}
                    value={value} onChange={(newValue) => handleDateChange(newValue)}
                    views={['year', 'month', 'day']}

                />
                {/* <h2>{value}</h2> */}
            </div>
        </LocalizationProvider>
    )
}