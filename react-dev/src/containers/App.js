import React, { Component } from 'react';

import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';

class App extends Component {
  constructor(props) {
    super(props);
    console.log("[App.js] inside constructor.", props);

    this.state = {
      persons: [
        {id: '1', name: 'Héctor', age: 22},
        {id: '2', name: 'Juan',   age: 22},
        {id: '3', name: 'Felipe', age: 22}
      ],
      otherState: 'some other value',
      showPersons: false
    }
  }

  componentWillMount() {
    console.log("[App.js] inside componentWillMount()");
  }
  
  componentDidMount() {
    console.log("[App.js] inside componentDidMount()");
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("[Update App.js] inside shouldComponentUpdate()", nextProps,nextState);
    return true;
  }

  componentWillUpdate() {
      console.log("[Update App.js] inside componentWillUpdate()");
  }

  componentDidUpdate() {
      console.log("[Update App.js] inside componentDidUpdate()");
  }


  nameChangeHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    }

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({persons: persons});
  }

  deletePersonHandler = (personIndex) => {
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  render(){
    console.log("[App.js] inside render()");
    let persons = null;
    
    if(this.state.showPersons) {
      persons = <Persons
        persons={this.state.persons}
        clicked={this.deletePersonHandler}
        changed={this.nameChangeHandler} />;
    }

    return(
      <div className={classes.App}>
        <Cockpit
          appTitle={this.props.title}
          showPersons={this.state.showPersons}
          persons={this.state.persons}
          clicked={this.togglePersonsHandler} />

          {persons}
      </div>
    );
  }
}

export default App;