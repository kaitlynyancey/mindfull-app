import React, { Component } from 'react';
import JournalContext from '../JournalContext';
import { Link } from 'react-router-dom';

function handleClickDelete(entryId, callback) {
    callback(entryId)
}


class JournalEntry extends Component {
    static contextType = JournalContext

    render() {
        return (
            <JournalContext.Consumer>
                {(context) => (
                    <li className="entry" key={this.props.id}>
                        <h3>{this.props.date}</h3>
                        <p>Mood: {this.props.mood}</p>
                        <p>Stress Level: {this.props.stressLevel}</p>
                        <p>Gratitudes: {this.props.gratitudes.map(i => {
                            return (i + ', ')
                        })}</p>
                        <p>Entry: {this.props.notes}</p>
                            <Link to={`/edit/${this.props.id}`}>
                                Edit
                            </Link>
                        <button onClick={() => { handleClickDelete(this.props.id, context.deleteEntry) }}>
                            Delete
                        </button>
                    </li>
                )}
            </JournalContext.Consumer>
        )
    }
}

export default JournalEntry;