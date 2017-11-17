import React, {Component} from 'react';
import StartForm from "./StartForm";
import SubmissionForm from "./SubmissionForm";
import Thankyou from "./Thankyou";

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
        responsePromise.then((response)=>{
            console.log(response.body)  ;
            
            this.acceptedInputs = response;
        })

    }
    acceptedInputs = [
        {
            name: "Jeff Barnes",
            givenKey: 1234,
            submitted: true,
            url: "dogs"
        }, {
            name: "Elliott Womack",
            givenKey: 4321,
            submitted: false,
            url: ""
        }
    ];

    findUser = (nameToCompare, keyToCompare) => {
        return this
            .acceptedInputs
            .find(({name, givenKey}) => {
                return nameToCompare
                    .toUpperCase()
                    .includes(name.toUpperCase()) && keyToCompare === givenKey
            });
    }

    handleCandidateSubmitInParent = ({name, givenKey}) => {
        let user = this.findUser(name, givenKey);
        let signedIn = false;
        if (user) {
            signedIn = true;
            // Check if they have a date set already, if not created one and post it. If
            // they have one, user that.
            if (!user.date) {
                user.date = new Date().getTime() + 2 * 3600000;
            }
            let countDownDate = user.date;
            this.setState({
                name: user.name,
                givenKey: user.givenKey,
                signedIn,
                countDownDate,
                submitted: user.submitted,
                url: user.url
            } //if there is no user match
            );
        } else {
            this.setState({badLogin: true});
        }
        // get countdown date from server and set it When they log in, post a variable
        // which should be the end date, so if they start at 12:00 on the 12th the end
        // date should be 14:00 etc make post request to server to update that theyve
        // logged in, to then decrement timer.

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
        console.log(this.state.countDownDate);
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
