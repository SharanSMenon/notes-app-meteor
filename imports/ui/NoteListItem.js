import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { createContainer } from 'meteor/react-meteor-data'
import { Session } from 'meteor/session';
export const NoteListItem = (props) => {
    const className = props.note.selected ? "item item--selected": "item"
    return (
        <div className={className} onClick={() => {
            props.Session.set('selectedNoteId', props.note._id)
            props.Session.set('isNavOpen', false)
        }}>
            <h5>{ props.note.title || 'Untitled note' }</h5>
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