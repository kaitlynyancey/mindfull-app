import React, { Component } from 'react';
import JournalContext from '../JournalContext';
const { API_BASE_URL } = require('../config')

class EditPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      date_created: "",
      month_created: "",
      mood: "",
      stress_level: "",
      gratitude1: "",
      gratitude2: "",
      gratitude3: "",
      notes: "",
      userid: "",
      error: null,
      entry: [],
    }
  }

  static contextType = JournalContext

  componentDidMount() {
    if (this.props.match) {
      const entryId = this.props.match.params.entryId
      fetch(`${API_BASE_URL}/entries/${entryId}`, {
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
          this.setState({
            entry: response
          })
        })
        .catch(error => {
          this.setState({ error })
        })
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    const updatedEntry = {
      id: parseInt(this.state.entry.id),
      date_created: this.state.entry.date_created,
      month_created: this.state.entry.month_created,
      mood: e.target.mood.value,
      stress_level: e.target.stressLevel.value,
      gratitude1: e.target.gratitude1.value,
      gratitude2: e.target.gratitude2.value,
      gratitude3: e.target.gratitude3.value,
      notes: e.target.notes.value,
      userid: this.state.entry.userid,
    }
    fetch(`${API_BASE_URL}/entries/${this.state.entry.id}`, {
      method: 'PATCH',
      body: JSON.stringify(updatedEntry),
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${process.env.REACT_APP_API_KEY}`
      }
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => {
            throw error
          })
        }
      })
      .then(response => {
        this.context.updateEntry(updatedEntry)
        this.props.history.push('/journal')
      })
      .catch(error => {
        this.setState({ error })
      })
  }

  render() {
    return (
      <div className="entrypage">
        <section className="center">
          <h3>Edit Entry for {this.state.entry.date_created}:</h3>
        </section>
        <form onSubmit={this.handleSubmit}>
          <section>
            <h3>Current Mood: </h3>
            <p><small>(Original Entry: {this.state.entry.mood})</small></p>
            <input type="radio" id="Excited" name="mood" value="Excited" selected={this.state.entry.mood === "Excited"} required />
            <label htmlFor="Excited"> Excited</label><br></br>
            <input type="radio" id="Happy" name="mood" value="Happy" selected={this.state.entry.mood === "Happy"} />
            <label htmlFor="Happy"> Happy</label><br></br>
            <input type="radio" id="Bored" name="mood" value="Bored" selected={this.state.entry.mood === "Bored"} />
            <label htmlFor="Bored"> Bored</label><br></br>
            <input type="radio" id="Sad" name="mood" value="Sad" selected={this.state.entry.mood === "Sad"} />
            <label htmlFor="Sad"> Sad</label><br></br>
            <input type="radio" id="Nervous" name="mood" value="Nervous" selected={this.state.entry.mood === "Nervous"} />
            <label htmlFor="Nervous"> Nervous</label><br></br>
            <input type="radio" id="Angry" name="mood" value="Angry" selected={this.state.entry.mood === "Angry"} />
            <label htmlFor="Angry"> Angry</label>
          </section>
          <section>
            <label htmlFor="stressLevel">Stress Level (1: Lowest, 10: highest): </label><br></br>
            <p><small>(Original Entry: {this.state.entry.stress_level})</small></p>
            <select name="stressLevel" id="stressLevel" defaultValue={this.state.entry.stress_level} required>
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
            <input type="text" id="gratitude1" name="gratitude1" defaultValue={this.state.entry.gratitude1} required />
            <br></br>
            <label htmlFor="gratitude2">2. </label>
            <input type="text" id="gratitude2" name="gratitude2" defaultValue={this.state.entry.gratitude2} required />
            <br></br>
            <label htmlFor="gratitude3">3. </label>
            <input type="text" id="gratitude3" name="gratitude3" defaultValue={this.state.entry.gratitude3} required />
          </section>
          <section>
            <h3>Free Space:</h3>
            <label htmlFor="notes">Write down your thoughts, feelings, revelations, things you did today, future plans, dreams, whatever you want!</label><br />
            <textarea name="notes" id="notes" rows="6" cols="50" defaultValue={this.state.entry.notes} required ></textarea>
          </section>
          <section className="center">
            <button type="submit">Submit</button>
            <button type="reset">Reset</button>
          </section>
        </form>
      </div>
    )
  }
}

export default EditPage;