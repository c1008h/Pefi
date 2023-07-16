import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

export const CalendarEl = (event) => {
    const [value, setValue] = useState(dayjs());
   
    function handleDateChange(newValue) {
        setValue(newValue)
        console.log(dayjs(value.$d).format('MM/DD/YYYY'))
    }
    function handleMonthChange(date) {
        setValue(date);
      }
    
    // console.log(dayjs(value.$d).format('MM/DD/YYYY'))

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div style={{flexDirection:'column'}} components={['DateCalendar', 'DateCalendar']} label={'"year", "month" and "day"'}>
                <DateCalendar
                    value={value} 
                    onChange={handleDateChange}
                    onMonthChange={handleMonthChange}
                    views={['year', 'month', 'day']}
                />
                <h2>{dayjs(value.$d).format('MM/DD/YYYY')}</h2>
            </div>
        </LocalizationProvider>
    )
}