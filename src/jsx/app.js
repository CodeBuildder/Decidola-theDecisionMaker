console.log('App.js is running')

const app = {
    title: 'Decidola',
    subtitle: 'Hey, this is Decidola. Let me help you decide your tasks for you.',
    options: ['Hey','two']
}

const onFormsubmit = (e) => {
    e.preventDefault()

    const option = e.target.elements.option.value;

    if(option) {
        app.options.push(option);
        e.target.elements.option.value = '';
        render()
    }
}

const onRemoveAll = (e) => {
    e.preventDefault()

    app.options = [];
    render()
}

const onDecision = (e) => {
    e.preventDefault()

    const randNum = Math.floor(Math.random() * app.options.length);
    const option = app.options[randNum]
    alert(option)
}


const appRoot = document.getElementById('app');


const render = () => {

    const template = (
        <div>
            <h1>{app.title}</h1> 
            <p>{app.subtitle}</p>
            <p>{app.options.length > 0 ? 'Here are your tasks:' : 'No tasks chosen.'}</p>
            <button disabled = {app.options.length === 0} onClick = {onDecision}>Ask me what to do?</button>
            <button onClick = {onRemoveAll}>Remove All Tasks</button>

            <ol> 
            {
                app.options.map((option) => {
                    return <li key = {option}>Your tasks: {option}</li>
                })
            }
            </ol>

    
            <form onSubmit = {onFormsubmit}>
            <input type="text" name = "option" required/>
            <button >Add Task</button>
            
            </form>
        </div>
    );

    ReactDOM.render(template, appRoot);

}

render()