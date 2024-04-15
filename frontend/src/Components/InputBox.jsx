import React from 'react'

const InputBox = React.memo(({label, type, placeholder, onChange, name}) => {
    return(
        <div>
            <div>
                {label}
            </div>
            <input 
                type={type} 
                name={name} 
                placeholder={placeholder} 
                autoComplete='true' 
                onChange={onChange} />
        </div>
    )
});

export default InputBox;