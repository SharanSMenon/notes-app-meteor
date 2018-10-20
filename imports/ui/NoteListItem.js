import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { createContainer } from 'meteor/react-meteor-data'
import { Session } from 'meteor/session';
export const NoteListItem = (props) => {
    return (
        <div onClick={() => {
            props.Session.set('selectedNoteId', props.note._id)
        }}>
            <h5>{ props.note.title || 'Untitled note' }</h5>
            { props.note.selected ? "Selected" : undefined}
            <p>{ moment(props.note.updatedAt).format('M/DD/YYYY') }</p>
        </div>
    );
};
NoteListItem.propTypes = {
    note: PropTypes.object.isRequired,
    Session: PropTypes.object.isRequired
};
export default createContainer(() => {
    return {
        Session
    };
}, NoteListItem);