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
            moods: moods,
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
    }

    render() {
        const entries = this.state.entries

        //Line chart data and styling
        const data = (canvas) => {
            const ctx = canvas.getContext("2d")
            const gradient = ctx.createLinearGradient(500, 0, 100, 0);
            gradient.addColorStop(0, "#0063A3")
            gradient.addColorStop(1, "#9663A3")
            return {
                labels: this.state.dates,
                datasets: [
                    {
                        label: 'Stress Level',
                        fill: false,
                        lineTension: 0.5,
                        backgroundColor: 'rgba(75,192,192,1)',
                        borderColor: gradient,
                        pointBackgroundColor: gradient,
                        borderWidth: 2,
                        data: this.state.stressLevels
                    }
                ]
            }
        }

        return (
            <div className="logpage">
                <section className="center fade-in">
                    <h2>Your Dashboard</h2>
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
                <div className="main-container wrapper-chart">
                    <div className="chart-container-1 fade-in">
                        <Pie
                            data={{
                                labels: ['Excited', 'Happy', 'Bored', 'Sad', 'Nervous', 'Angry'],
                                datasets: [
                                    {
                                        label: 'Mood',
                                        backgroundColor: [
                                            '#58A4B0',
                                            '#8955BD',
                                            '#5C59A3',
                                            '#5D84BA',
                                            '#B36578',
                                            '#B35696'
                                        ],
                                        hoverBackgroundColor: [
                                            '#3D727A',
                                            '#513270',
                                            '#3A3866',
                                            '#3E597D',
                                            '#75424F',
                                            '#693257'
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
                                    fontSize: 20,
                                    fontFamily: 'Lexend',
                                },
                                legend: {
                                    display: true,
                                    position: 'top'
                                },
                                responsive: true,
                                maintainAspectRatio: true,
                            }}
                        />
                    </div>
                    <div className="chart-container-1 fade-in">
                        <Line
                            id="myChart"
                            data={data}
                            options={{
                                title: {
                                    display: true,
                                    text: 'Stress Level Tracker',
                                    fontSize: 20,
                                    fontFamily: 'Lexend',
                                },
                                legend: {
                                    display: false,
                                },
                                responsive: true,
                                animation: {
                                    animateScale: true
                                },
                                maintainAspectRatio: true,
                                scales: {
                                    xAxes: [{
                                        ticks: { display: true },
                                        gridLines: {
                                            display: false,
                                            drawBorder: false,
                                        }
                                    }],
                                    yAxes: [{
                                        ticks: {
                                            display: true,
                                            beginAtZero: true,
                                            stepSize: 1,
                                            max: 10,
                                        },
                                        gridLines: {
                                            display: true,
                                            drawBorder: false,
                                        }
                                    }]
                                },
                            }}
                        />
                    </div>
                </div>

                <section className="center">
                    <h2>Your Journal Entries</h2>
                </section>
                <section>
                    <div className="entry-list">
                        {entries.map(entry =>
                            <JournalEntry
                                id={entry.id}
                                {...entry}
                                onDeleteEntry={this.handleDeleteEntry}
                            />)}
                    </div>
                </section>
            </div>
        )
    }
}

export default JournalPage;