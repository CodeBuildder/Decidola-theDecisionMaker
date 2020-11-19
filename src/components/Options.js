import React from 'react'
import Option from './Option'

const Options = (props) => (
    <div>
    <div className = "widgetHeader">
        <h3>Your Options</h3>
        <button 
            className="button button--link" 
            onClick = {props.onRemoveAll}>Remove All Tasks
        </button>
    </div>
    {props.options.length === 0 && <p className="widgetMessage">Hey, you can activate me by adding any task!</p>}
    {
        props.options.map((option, index) => (
            <Option 
                key={option}
                optionText={option}
                count={index+1}
                onRemoveOption={props.onRemoveOption}
            />
        ))
    }
    </div>
)
export default Options