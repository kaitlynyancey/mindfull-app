import React, { Component } from 'react';
import JournalContext from '../JournalContext';
import JournalEntry from './journal-entry';
const { API_BASE_URL } = require('../config')

class JournalPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            entries: [],
            month: 'all',
            currentUser: 'ADMIN'
        }
    }
    
    static contextType = JournalContext;


    handleChange = e => {
        const month = e.target.value
        var filteredEntries = this.context.entries.filter(entry =>
            entry.userid === this.context.currentUser)
        if(month !== 'all') {
            filteredEntries = filteredEntries.filter(entry =>
                entry.month_created === month
              )
        }
        this.setState({
            entries: filteredEntries
        })
    }

    handleDeleteEntry = entryId => {
        const newEntries = this.state.entries.filter(entry =>
            entry.id !== entryId
          )
          this.setState({
            entries: newEntries
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
            this.setState({
              entries: userEntries
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