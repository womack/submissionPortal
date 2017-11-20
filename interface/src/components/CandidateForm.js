import React, {Component} from 'react';
import './CandidateForm.css';

export default class CandidateForm extends Component {

    constructor() {
        super();
        this.state = {
            name: "",
            exerciseURL: "nonstempap.pdf",
            hoursGiven: 2
        }
    }
    handleChange = (valueName) => (event) => this.setState({[valueName]: event.target.value});
    handleSubmit = (e) => {
        e.preventDefault();
        this
            .props
            .onSubmit(this.state);
        this.setState({name: "", exerciseURL: "", hoursGiven: 2});
    }
    render() {
        return (
            <div className="CandidateForm">
                Create Candidate
                <br/>
                <form onSubmit={this.handleSubmit}>
                    Name:
                    <input
                        type="text"
                        placeholder="Candidate Name to Create"
                        onChange={this.handleChange("name")}
                        value={this.state.name}/>
                    Exercise:

                    <input
                        type="text"
                        placeholder="Exercise File"
                        onChange={this.handleChange("exerciseURL")}
                        value={this.state.exerciseURL}/>
                    Hours Given:
                    <input
                        type="number"
                        onChange={this.handleChange("hoursGiven")}
                        value={this.state.hoursGiven}/>
                    <button>Create</button>
                </form>
            </div>
        );
    }
}