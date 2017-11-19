import React, {Component} from 'react';

export default class Startform extends Component {

    constructor() {
        super();
        this.state = {
            name: "",
            givenKey: 433241
        };
    }

    handleChange = (valueName) => (event) => {
        let inputVar = event.target.value;
        if (parseInt(inputVar, 10)) {
            inputVar = parseInt(inputVar, 10);
        }
        this.setState({[valueName]: inputVar});
    }

    handleSubmit = (e) => {
        e.preventDefault();

        this
            .props
            .onSubmit(this.state);
    }

    render() {
        let errorMessage = null;
        if (this.props.badLogin) {
            errorMessage = (
                <div>
                    <p style={{
                        "color": "red"
                    }}>
                        Error logging in, check your name & key is correct
                    </p>
                </div>
            );
        }
        return (
            <form id="addmyData" onSubmit={this.handleSubmit}>
                First & Last Name:
                <input
                    type="text"
                    name="name"
                    value={this.state.name}
                    placeholder="John Smith"
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
                <div className="errorMessage">{errorMessage}</div>
            </form>
        );
    }
}
