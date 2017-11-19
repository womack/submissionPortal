import React, {Component} from 'react';
import CandidateList from "./CandidateList";
import CandidateForm from "./CandidateForm";

import privates from "../privates";

export default class AdminInterface extends Component {

    constructor() {
        super();
        this.state = {
            candidates: []
        }
        this.loadCandidates();
    }

    loadCandidates = () => {
        let responsePromise = fetch(`${privates.ip}`);
        responsePromise.then((response) => {
            response
                .json()
                .then((actualResponse) => this.setState({candidates: actualResponse}));
        });
    }

    deleteUser = (id) => {
        const newCandidates = [...this.state.candidates].filter((candidate) => candidate._id !== id);
        this.setState({candidates: newCandidates});
        const request = new Request(`${privates.ip}/` + id, {method: "DELETE"});
        fetch(request);
    }

    createCandidate = ({name}) => {
        const randomPin = Math.floor(Math.random() * 999999);
        const userObj = {
            name,
            givenKey: randomPin,
            url: "",
            submitted: false,
            countDownDate: 0
        };
        const request = new Request(`${privates.ip}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userObj)
        });
        fetch(request).then((responseObj) => {
            const newCandidates = [...this.state.candidates];
            responseObj
                .json()
                .then((newCandidate) => {
                    newCandidates.push(newCandidate);
                    this.setState({candidates: newCandidates});
                });
        });
    }

    render() {
        return (
            <div>
                <CandidateList deleteUser={this.deleteUser} candidates={this.state.candidates}/>
                <CandidateForm onSubmit={this.createCandidate}/>

            </div>
        );
    }
}