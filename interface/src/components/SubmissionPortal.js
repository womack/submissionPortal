import React, {Component} from 'react';
import StartForm from "./StartForm";
import SubmissionForm from "./SubmissionForm";
import Thankyou from "./Thankyou";

import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'

export default class SubmissionPortal extends Component {

    //load accepted inputs from server
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            givenKey: 0,
            url: "",
            countDownDate: "",
            signedIn: false,
            submitted: false,
            badLogin: false
        }
        this.loadCandidates();
    }

    loadCandidates = () => {
        let responsePromise = fetch("http://localhost:3001/api/candidate/");
        responsePromise.then((response) => {
            response
                .json()
                .then((actualResponse) => this.acceptedInputs = actualResponse);
        });
    }

    acceptedInputs = []

    findUser = (nameToCompare, keyToCompare) => {
        return this
            .acceptedInputs
            .find(({name, givenKey}) => nameToCompare.toUpperCase().includes(name.toUpperCase()) && keyToCompare === givenKey);
    }

    updateServerWithUser(user) {
        const request = new Request("http://localhost:3001/api/candidate/" + user._id, {
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
        if (user) {
            signedIn = true;
            if (!user.countDownDate) {
                user.countDownDate = new Date().getTime() + 2 * 3600000;
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
                    }, // Action after Confirm
                    onCancel: () => {}, // Action after Cancel
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
            url: url
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
            url: user.url
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
