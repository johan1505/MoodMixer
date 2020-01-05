import React, { Component } from 'react';
import './App.css'
import {Route} from "react-router-dom";
import HomePage from './components/HomePage';
import UserPage from './components/UserPage';

class App extends Component {
  render() {
    return (
      <div className="main-wrapper container">
        <Route path="/" exact component={HomePage} />
        <Route path="/User" exact component={UserPage} />
      </div>
    );
  }
}

export default App;