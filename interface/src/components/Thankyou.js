import React, {Component} from 'react';

export default class Thankyou extends Component {

    render() {
        return (
            <div>
                <h1>
                    Thank you for submitting your solution!
                </h1>
                <h2>
                    <u>
                        Submission Details
                    </u>
                </h2>
                <h3>Name: {this.props.name}</h3>
                <h3>Key: {this.props.givenKey}</h3>
                <h3>Submission URL: {this.props.url}</h3>
            </div>
        );

    }
}
