import React, { useState } from 'react';
import { DateCalendar } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

export const CalendarEl = () => {
    const [spend, setSpend] = useState([])

    const expense = (e) => {
        console.log(e.target)
    }

    return (
        <DateCalendar
            onClick={() => expense()}
            // defaultValue={initialValue}
            // loading={isLoading}
            // onMonthChange={handleMonthChange}
            // renderLoading={() => <DayCalendarSkeleton />}
            // slots={{
            //     day: ServerDay,
            // }}
            // slotProps={{
            //     day: {
            //     highlightedDays,
            //     } as any,
            // }}
        />
    )
}