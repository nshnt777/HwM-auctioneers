import React from 'react'

const Button = React.memo(({text, onClick})=>{
    return(
        <button onClick={onClick}>
            {text}
        </button>
    )
});

export default Button