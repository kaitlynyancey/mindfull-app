import React, { Component } from 'react';
import JournalContext from '../JournalContext';
import JournalEntry from './journal-entry';

class JournalPage extends Component {
    static contextType = JournalContext;

    render() {
        const entries = this.context.entries
        return (
            <div className="logpage">
                <section>
                    <h2>Journal Entries</h2>
                    <br></br>
                    <label htmlFor="year">Year: </label>
                    <select name="year" id="year" required>
                        <option value="2021">2021</option>
                        <option value="2022">2022</option>
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                        <option value="2025">2025</option>
                    </select>
                    <label htmlFor="month"> Month: </label>
                    <select name="month" id="month" required>
                        <option value="jan">Jan</option>
                        <option value="feb">Feb</option>
                        <option value="mar">Mar</option>
                        <option value="apr">Apr</option>
                        <option value="may">May</option>
                        <option value="jun">Jun</option>
                        <option value="jul">Jul</option>
                        <option value="aug">Aug</option>
                        <option value="sep">Sep</option>
                        <option value="oct">Oct</option>
                        <option value="nov">Nov</option>
                        <option value="dec">Dec</option>
                    </select>
                </section>
                <section>
                    <ul className="entry-list">
                        {entries.map(entry => 
                            <JournalEntry
                                id={entry.id}
                                {...entry} 
                            />)}
                    </ul>
                </section>
            </div>
        )
    }
}

export default JournalPage;