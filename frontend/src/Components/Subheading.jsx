import React from 'react'


const Subheading = React.memo(({text})=>{
    return(
        <div>
            {text}
        </div>
    )
})

export default Subheading;