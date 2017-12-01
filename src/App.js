import React, { Component } from 'react';
import { connect } from 'react-redux'
import './App.css';
import CalculatorForm from './Components/CalculatorForm/CalculatorForm'
import Result from './Components/Result/Result'

class App extends Component {
  render() {
    return (
      <div className="App">
        <CalculatorForm />
        <Result />
      </div>
    );
  }
}

export const AppTest = App;

export default connect(null)(App);
