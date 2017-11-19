import React, {Component} from 'react';
import qaclogo from './images/qac.png';
import SubmissionPortal from "./components/SubmissionPortal";
import {BrowserRouter as Router, Route} from 'react-router-dom'
import AdminInterface from './components/AdminInterface';

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <img alt="qalogo" src={qaclogo}/>
            <h1 className="App-title">Welcome to QAC's Submission Portal</h1>
          </header>
          <hr/>
          <br/>
          <Route exact path="/" component={SubmissionPortal}/>
          <Route path="/admin" component={AdminInterface}/>
        </div>
      </Router>
    );
  }
}

export default App;
