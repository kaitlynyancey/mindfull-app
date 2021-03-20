import React, { Component } from 'react';
import JournalContext from '../JournalContext';

class EditPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            date: "",
            month: "",
            mood: "",
            stressLevel: "",
            gratitudes: [],
            notes: "",
            userId: "",
            error: null,
        }
    }

    static contextType = JournalContext

    componentDidMount() {
        const entryId = this.props.match.params.entryId
        const editEntry = this.context.entries.filter(item => item.id === entryId)
        this.setState({
            id: editEntry[0].id,
            date: editEntry[0].date,
            month: editEntry[0].month,
            mood: editEntry[0].mood,
            stressLevel: editEntry[0].stressLevel,
            gratitudes: editEntry[0].gratitudes,
            notes: editEntry[0].notes,
            userId: editEntry[0].userId
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        const updatedEntry = {
            id: this.state.id,
            date: this.state.date,
            mood: e.target.mood.value,
            stressLevel: e.target.stressLevel.value,
            gratitudes: [e.target.gratitude1.value, e.target.gratitude2.value, e.target.gratitude3.value],
            notes: e.target.notes.value,
            userId: this.state.userId,
        }
        this.context.updateEntry(updatedEntry)
        this.props.history.push('/journal')
    }

    render() {
        return (
            <div className="entrypage">
                <section>
                    <h3>Edit Entry for {this.state.date}:</h3>
                </section>
                <form onSubmit={this.handleSubmit}>
                    <section>
                        <h3>Current Mood: </h3>
                        <p><small>(Original Entry: {this.state.mood})</small></p>
                        <input type="radio" id="excited" name="mood" value="Excited" selected={this.state.mood === "Excited"} required />
                        <label htmlFor="Excited"> Excited</label><br></br>
                        <input type="radio" id="happy" name="mood" value="Happy" selected={this.state.mood === "Happy"} />
                        <label htmlFor="Happy"> Happy</label><br></br>
                        <input type="radio" id="bored" name="mood" value="Bored" selected={this.state.mood === "Bored"} />
                        <label htmlFor="Bored"> Bored</label><br></br>
                        <input type="radio" id="sad" name="mood" value="Sad" selected={this.state.mood === "Sad"} />
                        <label htmlFor="Sad"> Sad</label><br></br>
                        <input type="radio" id="nervous" name="mood" value="Nervous" selected={this.state.mood === "Nervous"} />
                        <label htmlFor="Nervous"> Nervous</label><br></br>
                        <input type="radio" id="angry" name="mood" value="Angry" selected={this.state.mood === "Angry"} />
                        <label htmlFor="angry"> Angry</label>
                    </section>
                    <section>
                        <label htmlFor="stressLevel">Stress Level (1: Lowest, 10: highest): </label><br></br>
                        <p><small>(Original Entry: {this.state.stressLevel})</small></p>
                        <select name="stressLevel" id="stressLevel" defaultValue={this.state.stressLevel} required>
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
                        <input type="text" id="gratitude1" name="gratitude1" defaultValue={this.state.gratitudes[0]} required />
                        <br></br>
                        <label htmlFor="gratitude2">2. </label>
                        <input type="text" id="gratitude2" name="gratitude2" defaultValue={this.state.gratitudes[1]} required />
                        <br></br>
                        <label htmlFor="gratitude3">3. </label>
                        <input type="text" id="gratitude3" name="gratitude3" defaultValue={this.state.gratitudes[2]} required />
                    </section>
                    <section>
                        <h3>Free Space:</h3>
                        <label htmlFor="notes">Write down your thoughts, feelings, revelations, things you did today, future plans, dreams, whatever you want!</label><br />
                        <textarea name="notes" id="notes" rows="6" cols="50" defaultValue={this.state.notes} required ></textarea>
                    </section>
                    <button type="submit">Submit</button>
                    <button type="reset">Reset</button>
                </form>
            </div>
        )
    }
}

export default EditPage;