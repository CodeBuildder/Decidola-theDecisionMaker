import React from 'react'

const Option = (props) => (
    <div>
    {props.optionText}
    <button 
    onClick={(e) => {
        props.onRemoveOption(props.optionText)
    }}
        
    >Remove</button>
    </div>
)

export default Option