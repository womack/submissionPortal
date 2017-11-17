import React, {Component} from 'react';
import qaclogo from './images/qac.png';
import './App.css';
import SubmissionPortal from "./components/SubmissionPortal";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img alt="qalogo"  src={qaclogo}/>
          <h1 className="App-title">Welcome to QAC's Submission Portal</h1>
        </header>
        <hr/>
        <br/>
        <SubmissionPortal/>
      </div>
    );
  }
}

export default App;
