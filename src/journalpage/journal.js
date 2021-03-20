import React, { Component } from 'react';
import JournalContext from '../JournalContext';
import JournalEntry from './journal-entry';

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

    monthFilter = () => {
        console.log(this.state.month)
        console.log(this.state.entries)
        if(this.state.month !== 'all') {
            console.log('changed')
            const filteredEntries = this.state.entries.filter(entry =>
                entry.month === this.state.month
              )
              this.setState({
                  entries: filteredEntries
              })
        }
        console.log(this.state.entries)
    }

    handleChange = e => {
        const month = e.target.value
        var filteredEntries = this.context.entries.filter(entry =>
            entry.userId === this.context.currentUser)
        if(month !== 'all') {
            filteredEntries = filteredEntries.filter(entry =>
                entry.month === month
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
        const userEntries = this.context.entries.filter(entry =>
            entry.userId === this.context.currentUser) 
        this.setState({
            entries: userEntries
        })
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