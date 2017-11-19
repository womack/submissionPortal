import React, {Component} from 'react';
// import Candidate from './Candidate/Candidate';
import './CandidateList.css';
import ReactTable from 'react-table';
import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
import 'react-table/react-table.css'
export default class CandidateList extends Component {

    render() {
        const columns = [
            {
                Header: 'Name',
                accessor: 'name',
                filterable: true
            }, {
                Header: 'PIN',
                accessor: 'givenKey',
                filterable: false
            }, {
                Header: 'Exercise URL',
                accessor: 'exerciseURL',
                filterable: true
            }, {
                Header: 'Time Given',
                accessor: 'timeGiven',
                filterable: false
            }, {
                Header: 'Submission URL',
                accessor: 'url',
                filterable: false
            }, {
                Header: 'Submission Deadline',
                accessor: 'countDownDate',
                filterable: false
            }, {
                Header: "Delete",
                accessor: "removeChar",
                filterable: false
            }
        ]

        const data = this
            .props
            .candidates
            .map((candidate) => {
                const copiedCandidate = {
                    ...candidate
                };
                if (candidate.countDownDate === 0) {
                    copiedCandidate.countDownDate = "Not started yet";
                } else {
                    const actualDate = new Date(candidate.countDownDate).toLocaleDateString();
                    const time = new Date(candidate.countDownDate).toLocaleTimeString();
                    copiedCandidate.countDownDate = `${actualDate} ${time}`;
                }
                copiedCandidate.removeChar = "Remove"
                return copiedCandidate;
            });
        return (
            <div><br/>
                <ReactTable
                    filterable
                    defaultFilterMethod={(filter, row) => String(row[filter.id]).toLowerCase().includes(filter.value.toLowerCase())}
                    data={data}
                    columns={columns}
                    getTdProps={(state, rowInfo, column, instance) => {
                    return {
                        onClick: e => {
                            if (column.Header === "Delete" && rowInfo) {
                                confirmAlert({
                                    title: 'Confirm to start',
                                    message: `Are you sure you want to delete ${rowInfo.original.name}?`,
                                    confirmLabel: 'Confirm',
                                    cancelLabel: 'Cancel',
                                    onConfirm: () => {
                                        this
                                            .props
                                            .deleteUser(rowInfo.original._id);
                                    },
                                    onCancel: () => {}
                                });
                            }
                        }
                    }
                }}/>
            </div>
        );
    }
}