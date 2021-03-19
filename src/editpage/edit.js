import React, { Component } from 'react';
import JournalContext from '../JournalContext';

class EditPage extends Component {
    static contextType = JournalContext
    state = {
        entry: [],
        error: null,
    }

    componentDidMount() {
        const entryId = this.props.match.params.entryId
        const editTrip = this.context.entries.filter(item => item.id === parseInt(entryId))
        this.setState({
            entry: editTrip[0]
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        const updatedEntry = {
            id: this.state.entry.id,
            date: this.state.entry.date,
            mood: e.target.mood.value,
            stressLevel: e.target.stressLevel.value,
            gratitudes: [e.target.gratitude1.value, e.target.gratitude2.value, e.target.gratitude3.value],
            notes: e.target.notes.value,
            userId: this.state.entry.userId,
        }
        this.context.updateEntry(updatedEntry)
        this.props.history.push('/journal')
    }

    render() {
        const entry = this.state.entry
        return (
            <div className="entrypage">
                <section>
                    <h3>Edit Entry for {entry.date}:</h3>
                </section>
                <form onSubmit={this.handleSubmit}>
                    <section>
                        <h3>Current Mood: </h3>
                        <input type="radio" id="excited" name="mood" value="excited" required />
                        <label htmlFor="Excited"> Excited</label><br></br>
                        <input type="radio" id="happy" name="mood" value="happy" />
                        <label htmlFor="Happy"> Happy</label><br></br>
                        <input type="radio" id="bored" name="mood" value="bored" />
                        <label htmlFor="Bored"> Bored</label><br></br>
                        <input type="radio" id="sad" name="mood" value="sad" />
                        <label htmlFor="Sad"> Sad</label><br></br>
                        <input type="radio" id="nervous" name="mood" value="nervous" />
                        <label htmlFor="Nervous"> Nervous</label><br></br>
                        <input type="radio" id="angry" name="mood" value="angry" />
                        <label htmlFor="angry"> Angry</label>
                    </section>
                    <section>
                        <label htmlFor="stressLevel">Stress Level (1: Lowest, 10: highest): </label><br></br>
                        <select name="stressLevel" id="stressLevel" required>
                            <option value="">--</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                    </section>
                    <section>
                        <h3>I am grateful for...</h3>
                        <label htmlFor="gratitude1">1. </label>
                        <input type="text" id="gratitude1" name="gratitude1" required />
                        <br></br>
                        <label htmlFor="gratitude2">2. </label>
                        <input type="text" id="gratitude2" name="gratitude2" required />
                        <br></br>
                        <label htmlFor="gratitude3">3. </label>
                        <input type="text" id="gratitude3" name="gratitude3" required />
                    </section>
                    <section>
                        <h3>Free Space:</h3>
                        <label htmlFor="notes">Write down your thoughts, feelings, revelations, things you did today, future plans, dreams, whatever you want!</label><br />
                        <textarea name="notes" id="notes" rows="6" cols="50" required ></textarea>
                    </section>
                    <button type="submit">Submit</button>
                    <button type="reset">Reset</button>
                </form>
            </div>
        )
    }
}

export default EditPage;