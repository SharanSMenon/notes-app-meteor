import React from 'react';
import { Meteor } from 'meteor/meteor';

import PrivateHeader from './PrivateHeader';
import NoteList from './NoteList';
import Editor from './Editor'
export default () => (
    <div>
        <PrivateHeader title="Notes"/>
        <div className="wrapper">
            <NoteList />
            <Editor />
        </div>
    </div>
)