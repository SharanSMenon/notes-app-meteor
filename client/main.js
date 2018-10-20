import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker'
import { Session } from 'meteor/session'
import { browserHistory } from 'react-router'
import './../imports/startup/simple-schema-configuration.js';
import {routes, onAuthChange} from './../imports/routes/routes'

Tracker.autorun(() => {
    const currentPagePrivacy = Session.get('currentPagePrivacy')
    const isAuthenticated = !!Meteor.userId();
    onAuthChange(isAuthenticated, currentPagePrivacy);
});

Tracker.autorun(() => {
    const selectedNoteId =  Session.get('selectedNoteId');
    if (selectedNoteId) {
        browserHistory.replace(`/dashboard/${selectedNoteId}`)
    }
})

Meteor.startup(() => {
    Session.set('selectedNoteId', undefined)
    const app = document.getElementById('app');
    ReactDOM.render(routes, app)
})