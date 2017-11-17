import React, {Component} from 'react';
import StartForm from "./StartForm";
import SubmissionForm from "./SubmissionForm";
import Thankyou from "./Thankyou";

export default class SubmissionPortal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            givenKey: 0,
            url: "",
            timeLeft: 0,
            signedIn: false,
            submitted: false
        }
        //load accepted inputs from server
    }
    acceptedInputs = [
        {
            name: "Jeff Barnes",
            givenKey: 1234
        }, {
            name: "Elliott Womack",
            givenKey: 4321
        }
    ];

    validLogin = (nameToCompare, keyToCompare) => {
        let foundCandidate = this
            .acceptedInputs
            .find(({name, givenKey}) => {
                return nameToCompare
                    .toUpperCase()
                    .includes(name.toUpperCase()) && keyToCompare === givenKey
            });
        if (foundCandidate) {
            return true;
        } else {
            return false;
        }
    }

    handleCandidateSubmitInParent = ({name, givenKey}) => {
        let signedIn = this.validLogin(name, givenKey);
        this.setState({name, givenKey, signedIn});
        //make post request to server to update that theyve logged in, to then decrement timer.

    }
    handleSubmissionSubmitInParent = ({url}) => {
        this.setState({url, submitted: true});
        //make post request to server to update with url and submitted value.
    }

    render() {
        if (this.state.submitted) {
            return (
                <div>
                    <Thankyou
                        givenKey={this.state.givenKey}
                        name={this.state.name}
                        url={this.state.url}/>
                </div>
            );
        }
        if (this.state.signedIn) {
            return (
                <div>
                    <SubmissionForm
                        onSubmit={this.handleSubmissionSubmitInParent}
                        time={this.state.timeLeft}
                        givenKey={this.state.givenKey}
                        name={this.state.name}/>
                </div>
            );
        }
        return (
            <div>
                <StartForm onSubmit={this.handleCandidateSubmitInParent}/>
            </div>
        );
    }
}
