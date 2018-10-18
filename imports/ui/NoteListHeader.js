import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types'

import { Notes } from './../api/notes';

export const NoteListHeader = (props) => {
    return (
        <div>
            <button onClick={() => {
                props.meteorCall('notes.insert')
            }}>
                New Note
            </button>
        </div>
    )
}
export default createContainer(() => {
    return {
        meteorCall: Meteor.call
    }
}, NoteListHeader)