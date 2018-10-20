import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Session } from 'meteor/session';
import { Notes } from './../api/notes';
import NoteListHeader from './NoteListHeader'
import NoteListItem from './NoteListItem';
import NoteListEmptyItem from './NoteListEmptyItem';
export const NoteList = (props) => {
    return (
        <div>
            <p>Note List</p>
            <NoteListHeader />
            {(props.notes.length === 0) ? <NoteListEmptyItem />: undefined}
            {props.notes.map((note) => {
                return <NoteListItem note={note} key={note._id}/>
            })}
        </div>
    )
};

NoteList.propTypes = {
    notes: PropTypes.array.isRequired
};

export default createContainer(() => {
    const selectedNoteId = Session.get('selectedNoteId')
    Meteor.subscribe('notes');

    return {
        notes: Notes.find().fetch().map((note) => {
            return {
                ...note,
                selected: (selectedNoteId === note._id)
            }
        }),
    }
}, NoteList);