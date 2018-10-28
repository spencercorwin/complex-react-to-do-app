import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: [],
      input: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleSmallSubmit = this.handleSmallSubmit.bind(this);
  }

  //Adds the current "value" of the form's input to the App state
  handleSubmit(e) {
    this.setState({
      todo: [...this.state.todo, {todo: this.state.input, editing: false, id: Date.now()}],
      input: ''
    });
    e.preventDefault();
  }

  handleSmallSubmit(e, key) {
    let toggledToDo = this.state.todo.filter(todo => todo.id == key)[0];
    toggledToDo.todo = this.state.input;
    toggledToDo.editing = false;
    let indexOfToDo = this.state.todo.findIndex(todo => todo.id === key);
    this.setState({
      todo: [...this.state.todo.slice(0,indexOfToDo), toggledToDo, ...this.state.todo.slice(indexOfToDo+1)],
      input: ''
    });
    e.preventDefault();
  }

  //Changes the input state when the form's input changes
  handleChange(e) {
    this.setState({
      input: e.target.value
    })
  }

  handleDelete(key) {
    this.setState({
      todo: this.state.todo.filter(todo => todo.id !== key),
      input: ''
    })
  }

  handleEdit(key) {
    let toggledToDo = this.state.todo.filter(todo => todo.id == key)[0];
    toggledToDo.editing = true;
    let indexOfToDo = this.state.todo.findIndex(todo => todo.id === key);
    this.setState({
      todo: [...this.state.todo.slice(0,indexOfToDo), toggledToDo, ...this.state.todo.slice(indexOfToDo+1)],
      input: toggledToDo.todo
    })
  }

  handleClear() {
    this.setState({
      todo: [],
      input: ''
    })
  }


  render() {
    return (
     <div id="app">
        <h1>To Do App</h1>
        <Form
          click={this.handleSubmit}
          change={this.handleChange}
          input={this.state.input}
          clear={this.handleClear} />
        <ToDos
          todos={this.state.todo}
          delete={this.handleDelete}
          edit={this.handleEdit}
          change={this.handleChange}
          submit={this.handleSmallSubmit}
          input={this.state.input} />
     </div>
    )
  }
}

class Form extends React.Component {
  render() {
    return (
        <form onSubmit={this.props.click}>
          <input type="text" value={this.props.input} onChange={this.props.change}/>
          <input type="submit" value="Submit"/>
          <button onClick={this.props.clear}>Clear All</button>
        </form>
    )
  }
}

class ToDos extends React.Component {
  render() {
    return (
      <ul id="flex">
        {this.props.todos.map(x =>
                              <ToDo
                                delete={this.props.delete}
                                edit={this.props.edit}
                                change={this.props.change}
                                input={this.props.input}
                                submit={this.props.submit}
                                todo={x}/>
                             )}
      </ul>
    )
  }
}

class ToDo extends React.Component {
  delete(key) {
    this.props.delete(key);
  }

  edit(key) {
    this.props.edit(key);
  }

  submit(e, key) {
    this.props.submit(e, key);
  }

  render() {
    if(this.props.todo.editing) {
      return (
      <li key={this.props.todo.id}>
          <div onClick={() => this.delete(this.props.todo.id)}>x</div>
          <form onSubmit={(e) => this.submit(e, this.props.todo.id)}>
            <input type="text" value={this.props.input} onChange={this.props.change}/>
            <input id="submit" type="submit" value="Submit"/>
          </form>
      </li>
      )
    } else {
      return (
      <li key={this.props.todo.id}>
          <div onClick={() => this.delete(this.props.todo.id)}>x</div>
          {this.props.todo.todo}
          <button onClick={() => this.edit(this.props.todo.id)}>Edit</button>
      </li>
      )
    }
  }
}

ReactDOM.render(<App />, document.getElementById("main"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
