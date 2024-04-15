import {Link} from 'react-router-dom'
import React from 'react'

const BottomWarning = React.memo(({text, buttonText, to}) => {
    return(
        <div>
            {text}
            <Link to={to}>
                {buttonText}
            </Link>
        </div>
    )
})

export default BottomWarning