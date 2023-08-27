import { useState, useEffect } from 'react'
import { Carousel } from 'react-bootstrap'
import PropTypes from 'prop-types'; 
import dayjs from 'dayjs'

export default function GoalCarousel({ userData }) {
    const [thisYear, setThisYear] = useState()

    // console.log(currentYear)
    useEffect(() => {
        const currentYear = dayjs().year();
        setThisYear(currentYear)
    }, [])
    console.log(thisYear)
    return (
        <Carousel>
        <Carousel.Item>
            <h2></h2>
        </Carousel.Item>
        </Carousel>
    )
}

GoalCarousel.propTypes = {
    userData: PropTypes.object.isRequired,
}