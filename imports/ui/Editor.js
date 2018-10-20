// Imports 
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';
import { Notes } from '../api/notes';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router'
// Create editor class
export class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            body: ''
        }
        this.handleBodyChange = this.handleBodyChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.onDeleteNote = this.onDeleteNote.bind(this)
    }
    handleBodyChange(e) {
        const body = e.target.value
        this.setState({ body })
        this.props.call('notes.update', this.props.note._id, { body });
    }
    handleTitleChange(e) {
        const title = e.target.value;
        this.setState({ title })
        this.props.call('notes.update', this.props.note._id, { title })
    }
    componentDidUpdate(prevProps) {
        const currentNoteId = this.props.note ? this.props.note._id : undefined;
        const prevNoteId = prevProps.note ? prevProps.note._id : undefined;

        if (currentNoteId && currentNoteId !== prevNoteId) {
            this.setState({
                title: this.props.note.title,
                body: this.props.note.body
            });
        };
    }
    onDeleteNote() {
        this.props.call('notes.remove', this.props.note._id)
        this.props.browserHistory.push("/dashboard")
    }
    render() {
        if (this.props.note) {
            return (
                <div>
                    <input 
                        value={this.state.title}
                        placeholder="Untitled Note"
                        onChange={this.handleTitleChange}
                        
                    />
                    <textarea 
                        value={this.state.body}
                        placeholder="Enter note here..."
                        onChange={this.handleBodyChange}
                    ></textarea>
                    <button onClick={this.onDeleteNote}>Delete Note</button>
                </div>
            )
        } else {
            return (
                <p>{(this.props.selectedNoteId) ? "Note not found" : "Pick or create a note to get started." }</p>
            )
        }
    }
};

// PropTypes definition
Editor.propTypes = {
    note: PropTypes.object,
    selectedNoteId: PropTypes.string,
    call: PropTypes.func.isRequired,
    browserHistory: PropTypes.object.isRequired
}

// Default Export
export default createContainer(() => {
    const selectedNoteId = Session.get('selectedNoteId');

    return {
        selectedNoteId,
        note: Notes.findOne(selectedNoteId),
        call: Meteor.call,
        browserHistory
    }
}, Editor);