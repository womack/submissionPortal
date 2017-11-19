import React, {Component} from "react";

export default class AdminLoginForm extends Component {

    constructor() {
        super();
        this.state = {
            nb1234: ""
        };
    }

    handleChange = (valueName) => (event) => {
        const inputVar = event.target.value;
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
                        Error logging in, check your password is correct
                    </p>
                </div>
            );
        }
        return (
            <form onSubmit={this.handleSubmit}>
                Password:
                <input
                    type="password"
                    name="password"
                    value={this.state.nb1234}
                    onChange={this.handleChange("nb1234")}/>
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
