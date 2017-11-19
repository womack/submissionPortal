import React, {Component} from 'react';
import StartForm from "./StartForm";
import SubmissionForm from "./SubmissionForm";
import Thankyou from "./Thankyou";
import privates from "../privates";
import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'

export default class SubmissionPortal extends Component {
    acceptedInputs = []

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            givenKey: 0,
            url: "",
            countDownDate: "",
            signedIn: false,
            submitted: false,
            badLogin: false,
            exerciseURL: ""
        }
        this.loadCandidates();
    }

    loadCandidates = () => {
        let responsePromise = fetch(`${privates.ip}`);
        responsePromise.then((response) => {
            response
                .json()
                .then((actualResponse) => this.acceptedInputs = actualResponse);
        });
    }

    findUser = (nameToCompare, keyToCompare) => {
        return this
            .acceptedInputs
            .find(({name, givenKey}) => nameToCompare.toUpperCase().includes(name.toUpperCase()) && keyToCompare === givenKey);
    }

    updateServerWithUser(user) {
        const request = new Request(`${privates.ip}/` + user._id, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        return fetch(request).then((response) => response.json(), (err) => console.log(err));
    }

    handleCandidateSubmitInParent = ({name, givenKey}) => {
        const user = this.findUser(name, givenKey);
        let signedIn = false;
        const timeGiven = parseInt(user.timeGiven, 10);
        if (user) {
            signedIn = true;
            if (!user.countDownDate) {
                user.countDownDate = new Date().getTime() + (timeGiven * 3600000);
            }
            if (!user.submitted) {
                confirmAlert({
                    title: 'Confirm to start',
                    message: 'Are you ready to start?',
                    confirmLabel: 'Confirm',
                    cancelLabel: 'Cancel',
                    onConfirm: () => {
                        this.signInUser(user, signedIn);
                        this.updateServerWithUser(user);
                    },
                    onCancel: () => {}
                });
            } else {
                this.signInUser(user, signedIn);
            }
        } else {
            this.setState({badLogin: true});
        }
    }

    handleSubmissionSubmitInParent = ({url}) => {
        this.setState({url, submitted: true});
        const oldUserObj = this.findUser(this.state.name, this.state.givenKey);
        const userObj = {
            _id: oldUserObj._id,
            name: oldUserObj.name,
            countDownDate: this.state.countDownDate,
            submitted: true,
            givenKey: this.state.givenKey,
            url: url,
            exerciseURL: oldUserObj.exerciseURL
        }
        this.updateServerWithUser(userObj);
    }

    signInUser(user, signedIn) {
        this.setState({
            name: user.name,
            givenKey: user.givenKey,
            signedIn,
            countDownDate: user.countDownDate,
            submitted: user.submitted,
            url: user.url,
            exerciseURL: user.exerciseURL
        });
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
                        countDownDate={this.state.countDownDate}
                        givenKey={this.state.givenKey}
                        exerciseURL={this.state.exerciseURL}
                        name={this.state.name}/>
                </div>
            );
        }
        return (
            <div>
                <StartForm
                    onSubmit={this.handleCandidateSubmitInParent}
                    badLogin={this.state.badLogin}/>
            </div>
        );
    }
}
