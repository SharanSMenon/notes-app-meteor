import React from 'react';
import { Meteor } from 'meteor/meteor';

import PrivateHeader from './PrivateHeader';
import NoteList from './NoteList';
import Editor from './Editor'
import { Notes } from '../api/notes';
const noteArray = Notes.find({}, {
    sort: {
        updatedAt: -1
    }
}).fetch().map((note) => {
    return {
        ...note,
        selected: (selectedNoteId === note._id)
    }
})
export default () => (
    <div>
        <PrivateHeader title="Notes"/>
        <div className="page-content">
            <div className="page-content__sidebar">
                <NoteList notes={noteArray}/>
            </div>      
            <div className="page-content__main">
                <Editor />
            </div>
        </div>
    </div>
)