import { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import PropTypes from 'prop-types'; 
import dayjs from 'dayjs'
import { AllDisplay, FutureDisplay, PreviousDisplay, CurrentDisplay } from './Displays';
export default function GoalCarousel({ userData, layout }) {
    const [thisYear, setThisYear] = useState(null)
    const [currentYear, setCurrentYear] = useState(null);
    const [yearsToShow, setYearsToShow] = useState([]);
    const [selectedYear, setSelectedYear] = useState(null);
    const [active, setActiveTab] = useState(layout || null)

    useEffect(() => {
        const currentYear = dayjs().year();
        setCurrentYear(currentYear)
        setActiveTab(layout)

        if (layout === 'current') {
            setYearsToShow([currentYear])
        } else if (layout === 'previous') {
            setYearsToShow([currentYear - 4, currentYear - 3, currentYear - 2, currentYear - 1, currentYear])
        } else if (layout === 'future') {
            setYearsToShow([currentYear, currentYear + 1, currentYear + 2, currentYear + 3, currentYear + 4])
        } else if (layout === 'ten') {
            setYearsToShow([
                currentYear - 4,
                currentYear - 3, 
                currentYear - 2, 
                currentYear - 1, 
                currentYear,
                currentYear + 1, 
                currentYear + 2,
                currentYear + 3, 
                currentYear + 4
            ])
        } else {
            console.log('no data to show!')
        }
    }, [currentYear, layout])

    const handleYearChange = (year) => {
        setSelectedYear(year);
    };

    console.log(layout, ":", yearsToShow)
    return (
        <Container style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button onClick={() => handleYearChange(currentYear - 1)}> Previous </button>
            <Container>
                {active === 'current' ? <CurrentDisplay years={yearsToShow} userData={userData} />
                : active ==='previous' ? <PreviousDisplay years={yearsToShow} userData={userData} /> 
                : active === 'future' ? <FutureDisplay years={yearsToShow} userData={userData} />
                : active === 'ten' ? <AllDisplay years={yearsToShow} userData={userData} />
                : 'Select a tab!'
                }
                {/* <CurrentDisplay years={yearsToShow} userData={userData} /> */}
            </Container>
            <button onClick={() => handleYearChange(currentYear + 1)}> Next </button>
        </Container>
    )
}

GoalCarousel.propTypes = {
    userData: PropTypes.object.isRequired,
    layout: PropTypes.string.isRequired
}