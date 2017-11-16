import React, {Component} from 'react';
import StartForm from "./StartForm";
import SubmissionForm from "./SubmissionForm";

export default class SubmissionPortal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            key: 0,
            url: "",
            timeLeft: 0,
            signedIn: false
        }
    }

    handleCandidateSubmitInParent = ({name, key}) => {
        this.setState({name, key});
        //check credentials, if theyre legit then changed signedIn to true
    }
    handleSubmissionSubmitInParent = ({url}) => {
        this.setState({url});
    }

    render() {
        if (signedIn) {
            return (
                <div>
                    <SubmissionForm
                        onSubmit={this.handleSubmissionSubmitInParent}
                        time={this.state.timeLeft}
                        key={this.state.key}
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
