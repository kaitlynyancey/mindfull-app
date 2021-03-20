import React, { Component } from 'react';
import JournalContext from '../JournalContext';
import { Link } from 'react-router-dom';



class JournalEntry extends Component {
    static contextType = JournalContext
    static defaultProps = {
        onDeleteNote: () => { },
    }

    handleClickDelete(entryId, callback) {
        callback(entryId)
        this.props.onDeleteEntry(entryId)
    }

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