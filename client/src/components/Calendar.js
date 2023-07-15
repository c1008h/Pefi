import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { DateCalendar } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

export const CalendarEl = (event) => {
    const [value, setValue] = React.useState(dayjs());
    const [spend, setSpend] = useState([])

    // const headerEl = document.getElementById(':r1:-grid-label')

    // const expense = (e) => {
    //     console.log(e.target)
    // }
   
    function handleDateChange(newValue) {
        setValue(newValue)
        console.log(dayjs(value.$d).format('MM/DD/YYYY'))
    }
    console.log(dayjs(value.$d).format('MM/DD/YYYY'))
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div style={{flexDirection:'column'}} components={['DateCalendar', 'DateCalendar']} label={'"year", "month" and "day"'}>
                <DateCalendar
                    // onClick={(date) => pickDate(date)}
                    value={value} onChange={(newValue) => handleDateChange(newValue)}
                    views={['year', 'month', 'day']}

                />
                <h2>{dayjs(value.$d).format('MM/DD/YYYY')}</h2>
            </div>
        </LocalizationProvider>
    )
}