import React, {Component} from 'react';

export default class Startform extends Component {

    constructor() {
        super();
        this.state = {
            name: "",
            givenKey: 1234
        }
    }

    handleChange = (valueName) => (event) => {
        let inputVar = event.target.value;
        if (parseInt(inputVar, 10)) {
            inputVar = parseInt(inputVar, 10);
        }
        this.setState({[valueName]: inputVar})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this
            .props
            .onSubmit(this.state);
        this.setState({name: "", givenKey: 1234});
    }

    render() {
        return (
            <form id="addmyData" onSubmit={this.handleSubmit}>
                First & Last Name:
                <input
                    type="text"
                    name="name"
                    value={this.state.name}
                    placeHolder="John Smith"
                    onChange={this.handleChange("name")}/>
                <br/>
                <br/>
                Key:
                <input
                    type="number"
                    name="givenKey"
                    value={this.state.givenKey}
                    onChange={this.handleChange("givenKey")}/>
                    <br/>
                    <br/>
                    
                <button>
                    Submit
                </button>
            </form>
        );
    }
}
