import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Session } from 'meteor/session';
import { Notes } from './../api/notes';
import NoteListHeader from './NoteListHeader'
import NoteListItem from './NoteListItem';
import NoteListEmptyItem from './NoteListEmptyItem';
import FlipMove from 'react-flip-move'
export class NoteList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filters:''
        }
    }
    onFilterChange(e) {
        console.log(this.props)
        this.setState({
            filters: e.target.value
        })
    }
    render() {
        const notes = this.props.notes.filter(note => note.title.toLowerCase().includes(this.state.filters.toLowerCase()))
        return (
            <div className="item-list">
                <NoteListHeader />
                <div className="item-list__input">
                    <input 
                        type="text" 
                        placeholder="Search..."
                        value={this.state.filters}
                        onChange={this.onFilterChange.bind(this)}
                        />
                </div>
                {(notes.length === 0) ? <NoteListEmptyItem />: undefined}
                <FlipMove>
                    {notes.map((note) => {
                        return <NoteListItem note={note} key={note._id}/>
                    })}
                </FlipMove>
            </div>
        )
    }
}

NoteList.propTypes = {
    notes: PropTypes.array.isRequired
};

export default createContainer(() => {
    const selectedNoteId = Session.get('selectedNoteId')
    Meteor.subscribe('notes');

    return {
        notes: Notes.find({}, {
            sort: {
                updatedAt: -1
            }
        }).fetch().map((note) => {
            return {
                ...note,
                selected: (selectedNoteId === note._id)
            }
        }),
    }
}, NoteList);