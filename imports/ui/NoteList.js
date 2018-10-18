import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types'

import { Notes } from './../api/notes';
import NoteListHeader from './NoteListHeader'
import NoteListItem from './NoteListItem';

export const NoteList = (props) => {
    return (
        <div>
            <p>Note List</p>
            <NoteListHeader />
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
    Meteor.subscribe('notes');

    return {
        notes: Notes.find().fetch()
    }
}, NoteList);