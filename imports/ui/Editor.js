// Imports 
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';
import { Notes } from '../api/notes';
import PropTypes from 'prop-types';

// Create editor class
export class Editor extends React.Component {
    constructor(props) {
        super(props)
        this.handleBodyChange = this.handleBodyChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
    }
    handleBodyChange(e) {
        this.props.call('notes.update', this.props.note._id, {
            body: e.target.value
        });
    }
    handleTitleChange(e) {
        this.props.call('notes.update', this.props.note._id, {
            title: e.target.value
        })
    }
    render() {
        if (this.props.note) {
            return (
                <div>
                    <input 
                        value={this.props.note.title}
                        placeholder="Untitled Note"
                        onChange={this.handleTitleChange}
                        
                    />
                    <textarea 
                        value={this.props.note.body}
                        placeholder="Enter note here..."
                        onChange={this.handleBodyChange}
                    ></textarea>
                    <button>Delete Note</button>
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
    selectedNoteId: PropTypes.string
}

// Default Export
export default createContainer(() => {
    const selectedNoteId = Session.get('selectedNoteId');

    return {
        selectedNoteId,
        note: Notes.findOne(selectedNoteId),
        call: Meteor.call
    }
}, Editor);