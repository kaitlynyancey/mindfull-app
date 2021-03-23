import React, { Component } from 'react';
import JournalContext from '../JournalContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaugh, faSmile, faMeh, faFrown, faGrimace, faAngry } from '@fortawesome/free-solid-svg-icons';

const { API_BASE_URL } = require('../config')


class EntryPage extends Component {
    static contextType = JournalContext

    handleSubmit = e => {
        e.preventDefault()
        const newEntry = {
            date_created: new Date().toLocaleDateString(),
            month_created: new Date().toLocaleString('default', { month: 'long' }),
            mood: e.target.mood.value,
            stress_level: e.target.stressLevel.value,
            gratitude1: e.target.gratitude1.value,
            gratitude2: e.target.gratitude2.value, 
            gratitude3: e.target.gratitude3.value,
            notes: e.target.notes.value,
            userid: this.context.currentUser,
        }
        fetch(`${API_BASE_URL}/entries`, {
            method: 'POST',
            body: JSON.stringify(newEntry),
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
              return res.json()
            })
            .then(response => {
                this.context.addEntry(response)
                this.props.history.push('/journal')
            })
            .catch(error => {
              this.setState({ error })
            })
    }

    render() {
        const date = new Date().toLocaleDateString()

        //get font awesome icons
        const excited = <FontAwesomeIcon icon={faLaugh} />
        const happy = <FontAwesomeIcon icon={faSmile} />
        const bored = <FontAwesomeIcon icon={faMeh} />
        const sad = <FontAwesomeIcon icon={faFrown} />
        const nervous = <FontAwesomeIcon icon={faGrimace} />
        const angry = <FontAwesomeIcon icon={faAngry} />

        return (
            <div className="entrypage fade-in">
                <section className="center">
                    <h3>New Entry for {date}:</h3>
                </section>
                <form onSubmit={this.handleSubmit}>
                    <section>
                        <h3>Current Mood: </h3>
                        <input type="radio" id="excited" name="mood" value="Excited" required />
                        <label htmlFor="Excited"> - {excited} Excited </label><br></br>
                        <input type="radio" id="happy" name="mood" value="Happy" />
                        <label htmlFor="Happy"> - {happy} Happy </label><br></br>
                        <input type="radio" id="bored" name="mood" value="Bored" />
                        <label htmlFor="Bored"> - {bored} Bored </label><br></br>
                        <input type="radio" id="sad" name="mood" value="Sad" />
                        <label htmlFor="Sad"> - {sad} Sad </label><br></br>
                        <input type="radio" id="nervous" name="mood" value="Nervous" />
                        <label htmlFor="Nervous"> - {nervous} Nervous </label><br></br>
                        <input type="radio" id="angry" name="mood" value="Angry" />
                        <label htmlFor="angry"> - {angry} Angry </label>
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
                        <textarea name="notes" id="notes" rows="10" required ></textarea>
                    </section>
                    <button type="submit">Submit</button>
                    <button type="reset">Reset</button>
                </form>
            </div>
        )
    }
}

export default EntryPage;