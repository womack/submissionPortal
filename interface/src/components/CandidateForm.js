import React, {Component} from 'react';
import './CandidateForm.css';

export default class CandidateForm extends Component {

    constructor() {
        super();
        this.state = {
            name: ""
        }
    }
    handleChange = (valueName) => (event) => this.setState({[valueName]: event.target.value});
    handleSubmit = (e) => {
        e.preventDefault();
        this
            .props
            .onSubmit(this.state);
        this.setState({name: ""});
    }
    render() {
        return (
            <div className="CandidateForm">
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        placeholder="Candidate Name to Create"
                        onChange={this.handleChange("name")}
                        value={this.state.name}/>
                    <button>Create</button>
                </form>
            </div>
        );
    }
}