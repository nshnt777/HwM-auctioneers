import React from 'react'

const Heading = React.memo(({text})=>{
    return(
        <div>
            {text}
        </div>
    )
})

export default Heading;