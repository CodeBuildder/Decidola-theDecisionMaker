import  React from 'react'


export default class AddOptions extends React.Component {
    constructor(props){
        super(props)
        this.addOption = this.addOption.bind(this)
        this.state = {
            error: undefined
        }
    }
    addOption(e){
        e.preventDefault();
        
        const option = e.target.elements.option.value.trim();
        const error = this.props.addOption(option)

        this.setState(() => ({ error }))

        if(!error) {
            e.target.elements.option.value = ''
        }
    }
    render(){ 
        
        return(
            <div>
            {this.state.error && <p>{this.state.error}</p>}
            <form onSubmit = {this.addOption}>
            <input type="text" name = "option" />
            <button >Add Task</button>
            </form>
            </div>
        )
    }
}

