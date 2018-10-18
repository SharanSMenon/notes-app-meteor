import React from 'react';
import { Meteor } from 'meteor/meteor';

import PrivateHeader from './PrivateHeader'
import NoteList from './NoteList'
export default () => (
    <div>
        <PrivateHeader title="Notes"/>
        <div className="wrapper">
            <NoteList />
        </div>
    </div>
)