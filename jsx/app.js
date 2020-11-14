class Decidola extends React.Component{
    constructor(props) {
        super(props)
        this.onRemoveAll = this.onRemoveAll.bind(this)
        this.onRemoveOption = this.onRemoveOption.bind(this)
        this.randPick = this.randPick.bind(this)
        this.addOption = this.addOption.bind(this)
        this.state = {
            options: []
        }
    }

    componentDidMount() {

        try{

            const json = localStorage.getItem('options')
            const options = JSON.parse(json)
    
            if(options) {
                this.setState(() => ({ options }))
            }

        }catch(e){



        }
       
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.options.length !== this.state.options.length){
            console.log('Saving this Data.')
            const json = JSON.stringify(this.state.options)
            localStorage.setItem('options', json)
        }
    }

    componentWillUnmount() {
        console.log('Component Unmounted')
    }

    randPick(){
        this.setState(() => {
            
                const randNum = Math.floor(Math.random() * this.state.options.length);
                const option = this.state.options[randNum]
                alert(option)  
                 
        })
    }
    onRemoveAll() {
        this.setState(() => ({
        
            options: []    
        }))
    }

    onRemoveOption(optionToRemove) {
        this.setState((prevState) => ({
            options: prevState.options.filter ((option) => 
                 optionToRemove !== option
            )
        }))
    }

    addOption(option){

        if(!option){
            return 'I am sorry, I quite did not catch that task. Please give a valid task.'
        }else if(this.state.options.indexOf(option) > -1){
            return 'Hey, you have already entered this ask. Try another one!'
        }

        this.setState((prevState) => ({
           
                options: prevState.options.concat([option])
            
        }))
    }

    render(){
        const title = 'Decidola'
        const subtitle = 'Hey, this is Decidola. Let me help you decide your tasks for you.'
        

        return(
            <div>
                <Header subtitle={subtitle}/>
                <Action 
                    optionCheck={this.state.options.length > 0}
                    randPick = {this.randPick}
                />
                <Options 
                    options={this.state.options}
                    onRemoveAll ={this.onRemoveAll}
                    onRemoveOption = {this.onRemoveOption}
                />
                <AddOptions
                    addOption = {this.addOption}
                />
            </div>
        )
    }
}

const Header = (props) => {
    return(
        <div>
        <h1>{props.title}</h1>
        {props.subtitle && <h2>{props.subtitle}</h2>}
        </div>
    )  
}

Header.defaultProps = {
    title: 'Decidola'
}

const Action = (props) => {
    return(
        <div>
        <button 
            onClick={props.randPick}
            disabled={!props.optionCheck}
        >
        Ask me what to do?
        </button>
        </div>
    )
}
const Options = (props) => {
    return(
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
}

const Option = (props) => {
    return(
        <div>
        {props.optionText}
        <button 
        onClick={(e) => {
            props.onRemoveOption(props.optionText)
        }}
            
        >Remove</button>
        </div>
    )
}



class AddOptions extends React.Component {
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


ReactDOM.render(<Decidola />, document.getElementById('app'))