import React, {Component} from 'react';

export default class AdminInterface extends Component {

    constructor() {
        super();
        this.state = {
            candidates: [
                {
                    name: "Elliott Womack",
                    givenKey: "4321",
                    submitted: false,
                    url: "",
                    timeLeft: 200000

                },
                {
                    name: "Jeff Barnes",
                    givenKey: "1234",
                    submitted: true,
                    url: "www.dogs.com",
                    timeLeft: 200000
                }
            ]
        }
        // load data from DB, all entries of candidates. have forms to create new users
        // so they can login etc.

    }

    render() {
        return (
            <div></div>
        );
    }
}
