// import { useState } from 'react'
import PropTypes from 'prop-types'; 

export default function AllDisplay({userData}) {

    return (
        <div>
        <h3>Hey {userData.firstName}</h3>
        </div>
    )
}

AllDisplay.propTypes = {
    userData: PropTypes.object.isRequired,
}