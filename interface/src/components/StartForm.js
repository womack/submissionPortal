import React, {Component} from 'react';

class Startform extends Component {

    constructor() {
        this.state = {
            name: "",
            key: 0
        }
    }

    handleChange = (valueName) => (event) => this.setState({[valueName]: event.target.value});
    handleSubmit = (e) => {
        e.preventDefault();
        this
            .props
            .onSubmit(this.state);
        this.setState({name: "", key: 0});
    }
    render() {
        return (
            <form id="addmyData" onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleChange("name")}/>
                <input
                    type="number"
                    name="key"
                    value={this.state.key}
                    onChange={this.handleChange("key")}/>
            </form>
        );
    }
}

export default Startform;
