import React from 'react'
import FlipMove from 'react-flip-move';

const Option = (props) => (
    <div className="option">
    <p className ="optionText">{props.count}.  {props.optionText}</p>
    <button 
    className = "button--link"
    onClick={(e) => {
        props.onRemoveOption(props.optionText)
        
        const change = document.getElementById('option')

        change.style.opacity = '0';

    }}
        
    >Remove</button>
    </div>
)

export default Option