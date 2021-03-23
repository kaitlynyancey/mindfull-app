import React, { Component } from 'react';
import JournalContext from '../JournalContext';
import JournalEntry from './journal-entry';
import { Line, Pie } from 'react-chartjs-2';

const { API_BASE_URL } = require('../config')


class JournalPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            entries: [],
            month: 'all',
            currentUser: 'ADMIN',
            stressLevels: '',
            dates: '',
            moods: [],
        }
    }

    static contextType = JournalContext;


    handleChange = e => {
        const month = e.target.value
        var filteredEntries = this.context.entries.filter(entry =>
            entry.userid === this.context.currentUser)
        if (month !== 'all') {
            filteredEntries = filteredEntries.filter(entry =>
                entry.month_created === month
            )
        }
        const stressLevels = filteredEntries.map(entry =>
            entry.stress_level
        )
        const dates = filteredEntries.map(entry =>
            entry.date_created)
        const moods = filteredEntries.map(entry =>
            entry.mood)
        this.setState({
            entries: filteredEntries,
            stressLevels: stressLevels,
            dates: dates,
            moods: moods,
        })
    }

    handleDeleteEntry = entryId => {
        const newEntries = this.state.entries.filter(entry =>
            entry.id !== entryId
        )
        const stressLevels = newEntries.map(entry =>
            entry.stress_level
        )
        const dates = newEntries.map(entry =>
            entry.date_created)
        const moods = newEntries.map(entry =>
                entry.mood)

        this.setState({
            entries: newEntries,
            stressLevels: stressLevels,
            dates: dates,
            moods:moods,
        })
    }
    componentDidMount() {
        fetch(`${API_BASE_URL}/entries`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${process.env.REACT_APP_API_KEY}`,
            }
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(error => {
                        throw error
                    })
                }
                return res.json()
            })
            .then(response => {
                const userEntries = response.filter(entry =>
                    entry.userid === this.context.currentUser)
                const stressLevels = userEntries.map(entry =>
                    entry.stress_level
                )
                const dates = userEntries.map(entry =>
                    entry.date_created)
                const moods = userEntries.map(entry =>
                    entry.mood)

                this.setState({
                    entries: userEntries,
                    stressLevels: stressLevels,
                    dates: dates,
                    moods: moods,
                })
            })
            .catch(error => {
                this.setState({ error })
            })
        // const userEntries = this.context.entries.filter(entry =>
        //     entry.userid === this.context.currentUser) 
        // this.setState({
        //     entries: userEntries
        // })
    }

    render() {
        const entries = this.state.entries
        
        return (
            <div className="logpage">
                <section className="center">
                    <h2>Journal Entries</h2>
                    <br></br>
                    <label htmlFor="month"> Month: </label>
                    <select name="month" id="month" onChange={this.handleChange} value={this.state.value}>
                        <option value="all">All</option>
                        <option value="January">Jan</option>
                        <option value="February">Feb</option>
                        <option value="March">Mar</option>
                        <option value="April">Apr</option>
                        <option value="May">May</option>
                        <option value="June">Jun</option>
                        <option value="July">Jul</option>
                        <option value="August">Aug</option>
                        <option value="September">Sep</option>
                        <option value="October">Oct</option>
                        <option value="November">Nov</option>
                        <option value="December">Dec</option>
                    </select>
                </section>
                <div className="wrapper">
                    <Pie
                        data={{
                            labels: ['Excited', 'Happy', 'Bored', 'Sad', 'Nervous', 'Angry'],
                            datasets: [
                                {
                                    label: 'Mood',
                                    backgroundColor: [
                                        '#B21F00',
                                        '#C9DE00',
                                        '#2FDE00',
                                        '#00A6B4',
                                        '#6800B4'
                                    ],
                                    hoverBackgroundColor: [
                                        '#501800',
                                        '#4B5000',
                                        '#175000',
                                        '#003350',
                                        '#35014F'
                                    ],
                                    data: [
                                        this.state.moods.filter(i => i === "Excited").length,
                                        this.state.moods.filter(i => i === "Happy").length,
                                        this.state.moods.filter(i => i === "Bored").length,
                                        this.state.moods.filter(i => i === "Sad").length,
                                        this.state.moods.filter(i => i === "Nervous").length,
                                        this.state.moods.filter(i => i === "Angry").length
                                    ]
                                }
                            ]
                        }}
                        options={{
                            title: {
                                display: true,
                                text: 'Mood Tracker',
                                fontSize: 20
                            },
                            legend: {
                                display: true,
                                position: 'right'
                            }
                        }}

                    />
                </div>
                <br></br>
                <div className="wrapper">
                    <Line
                        data={{
                            labels: this.state.dates,
                            datasets: [
                                {
                                    label: 'Stress Level',
                                    fill: false,
                                    lineTension: 0.5,
                                    backgroundColor: 'rgba(75,192,192,1)',
                                    borderColor: 'rgba(0,0,0,1)',
                                    borderWidth: 2,
                                    data: this.state.stressLevels
                                }
                            ]
                        }}
                        options={{
                            title: {
                                display: true,
                                text: 'Stress Level Tracker',
                                fontSize: 20
                            },
                            legend: {
                                display: false,
                                position: 'right'
                            }
                        }}
                    />
                </div>
                <section>
                    <ul className="entry-list">
                        {entries.map(entry =>
                            <JournalEntry
                                id={entry.id}
                                {...entry}
                                onDeleteEntry={this.handleDeleteEntry}
                            />)}
                    </ul>
                </section>
            </div>
        )
    }
}

export default JournalPage;