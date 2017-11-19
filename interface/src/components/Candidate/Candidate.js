import React from 'react';
import './Candidate.css';

const Candidate = (props) => {
    let url = props.url;
    if (!url) {
        url = "No URL Submitted";
    }
    let date = props.countDownDate;
    if (date) {
        let actualDate = new Date(props.countDownDate).toLocaleDateString();
        let time = new Date(props.countDownDate).toLocaleTimeString();
        date =  `${actualDate} ${time}`;
    }
    return (
        <div className="Candidate">
            <p>Name: {props.name}</p>
            <p>Key: {props.givenKey}</p>
            <p>Submission Deadline: {date}</p>
            <p>URL: {url}</p>
            <p>{props.children}</p>
        </div>
    )
};
export default Candidate;