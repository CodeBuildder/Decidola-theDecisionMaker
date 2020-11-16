import React from 'react'
import Option from './Option'

const Options = (props) => (
    <div>
    <button onClick = {props.onRemoveAll}>Remove All Tasks</button>
    {props.options.length === 0 && <p>Hey, you can activate me by adding any task!</p>}
    {
        props.options.map((option) => (
            <Option 
                key={option}
                optionText={option}
                onRemoveOption={props.onRemoveOption}
            />
        ))
    }
    </div>
)
export default Options