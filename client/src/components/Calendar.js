import React, { useState } from 'react';
import Calendar from 'react-calendar'
import styled from 'styled-components';

const CalendarContainer = styled.div`
  /* ~~~ container styles ~~~ */
  max-width: 600px;
  margin: auto;
  margin-top: 20px;
  background-color: #d4f7d4;
  padding: 10px;
  border-radius: 3px;
`;

export const CalendarEl = (event) => {
    const [date, setDate] = useState(new Date());
    const [showForm, setShowForm] = useState(false);

    const dayDiv = document.getElementsByClassName('react-calendar__month-view__days')

    const onDateChange = (date) => {
        setDate(date);
    };

    const onTileClick = (date) => {
        setDate(date);
        setShowForm(true);
    };
    dayDiv.addEventListener('click', function(event) {
        console.log(event.target)
    })
    return (
        <CalendarContainer>
        <Calendar
              onChange={onDateChange}
              value={date}
              onClickDay={onTileClick}
          />
        </CalendarContainer>
    )
}