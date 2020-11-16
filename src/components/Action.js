import React from 'react'

const Action = (props) => (
    
        <div>
        <button 
            onClick={props.randPick}
            disabled={!props.optionCheck}
        >
        Ask me what to do?
        </button>
        </div>
    
)

export default Action