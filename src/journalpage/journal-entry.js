import React, { Component } from 'react';
import JournalContext from '../JournalContext';
import { Link } from 'react-router-dom';
const { API_BASE_URL } = require('../config')



class JournalEntry extends Component {
    static contextType = JournalContext
    static defaultProps = {
        onDeleteEntry: () => { },
    }

    handleClickDelete(entryId, callback) {
        fetch(`${API_BASE_URL}/entries/${entryId}`, {
            method: 'DELETE',
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
                this.props.onDeleteEntry(entryId)
                callback(entryId)
                
            })
            .catch(error => {
                this.setState({ error })
            })
    }

    render() {
        return (
            <JournalContext.Consumer>
                {(context) => (
                    <li className="entry" key={this.props.id}>
                        <h3>{this.props.date_created}</h3>
                        <p><b>Mood: </b> {this.props.mood}</p>
                        <p><b>Stress Level: </b> {this.props.stress_level}</p>
                        <p><b>Gratitudes: </b> {this.props.gratitude1}, {this.props.gratitude2}, {this.props.gratitude3}</p>
                        <p><b>Entry: </b> {this.props.notes}</p>
                        <Link to={`/edit/${this.props.id}`}>
                            Click to Edit
                            </Link>
                        <br></br>
                        <button
                            onClick={() => { this.handleClickDelete(this.props.id, context.deleteEntry) }}
                            className="delete-button">
                            Delete
                        </button>
                    </li>
                )}
            </JournalContext.Consumer>
        )
    }
}

export default JournalEntry;