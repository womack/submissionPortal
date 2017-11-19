import React, {Component} from 'react';
import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'

export default class SubmissionForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: "",
            timeLeft: this.calculateTimeLeft(),
            ableToSubmit: true,
            intervalId: setInterval(this.timerFunction, 1000)
        }
    }
    componentWillUnmount() {
        clearInterval(this.state.intervalId);
    }
    timerFunction = () => {
        this.setState({
            timeLeft: this.calculateTimeLeft()
        });
    }
    calculateTimeLeft = () => {
        let now = new Date().getTime();
        let distance = this.props.countDownDate - now;
        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);
        if (days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0) {
            this.setState({ableToSubmit: false});
        }
        return `${days} Days  ${hours} Hours  ${minutes} Minutes  ${seconds} Seconds`;
    }

    handleChange = (valueName) => (event) => this.setState({[valueName]: event.target.value});
    handleSubmit = (e) => {
        e.preventDefault();
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure this is the link with your submitted document?',
            confirmLabel: 'Confirm',
            cancelLabel: 'Cancel',
            onConfirm: () => {
                this
                    .props
                    .onSubmit(this.state);
                this.setState({url: ""});
            }, // Action after Confirm
            onCancel: () => {}, // Action after Cancel
        });
    }

    render() {
        if (!this.state.ableToSubmit) {
            return (
                <div>
                    You have run out of time! Sorry about that, contact your recruiter to find out
                    the next steps.</div>
            )
        }
        return (
            <div>
                <h3>Instructions</h3>
                <p>Download/Open the following PDF, follow the instructions provided and then
                    create a document (Word, PDF, Publisher), upload it (Google drive, dropbox,
                    etc.), and provide the shareable URL to the file in the box below.</p>
                <p style={{
                    "color": "red"
                }}>
                    <b>Once you submit, you will no longer be able to submit again.</b>
                </p>
                <div className="submissionForm" onSubmit={this.handleSubmit}>
                    <h2>
                        Name: {this.props.name}</h2>
                    <h2>
                        Key: {this.props.givenKey}</h2>
                    <h3>
                        Time: {this.state.timeLeft}</h3>
                    <form>
                        Document URL:
                        <input
                            type="text"
                            name="url"
                            value={this.state.url}
                            onChange={this.handleChange("url")}/>
                        <button>
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}