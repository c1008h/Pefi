// import { useState } from 'react'
import PropTypes from 'prop-types'; 

export default function Display({userData}) {

    return (
        <div>
        <h3>Hey {userData.firstName}</h3>
        </div>
    )
}

Display.propTypes = {
    userData: PropTypes.object.isRequired,
}