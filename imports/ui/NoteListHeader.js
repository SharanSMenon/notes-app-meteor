import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';

import { Notes } from './../api/notes';
import { Session } from 'meteor/session';

export const NoteListHeader = (props) => {
    return (
        <div className="item-list__header">
            <button className='button button-hover' onClick={() => {
                props.meteorCall('notes.insert', (err, res) => {
                    if (res) {
                        props.Session.set('selectedNoteId', res)
                        props.Session.set('isNavOpen', false)
                    }
                })
            }}>
                New Note
            </button>
        </div>
    );
};

NoteListHeader.propTypes = {
    meteorCall: PropTypes.func.isRequired,
    Session: PropTypes.object.isRequired
};

export default createContainer(() => {
    return {
        meteorCall: Meteor.call,
        Session
    }
}, NoteListHeader)