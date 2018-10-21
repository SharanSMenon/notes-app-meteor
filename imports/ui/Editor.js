// Imports 
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';
import { Notes } from '../api/notes';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router'
import Modal from 'react-modal'
// Create editor class
export class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            body: '',
            modalIsOpen: false
        }
        this.handleBodyChange = this.handleBodyChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.onDeleteNote = this.onDeleteNote.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this)
    }
    handleBodyChange(e) {
        const body = e.target.value
        this.setState({ body })
        this.props.call('notes.update', this.props.note._id, { body });
    }
    handleTitleChange(e) {
        const title = e.target.value;
        this.setState({ title })
        this.props.call('notes.update', this.props.note._id, { title })
    }
    componentDidUpdate(prevProps) {
        const currentNoteId = this.props.note ? this.props.note._id : undefined;
        const prevNoteId = prevProps.note ? prevProps.note._id : undefined;

        if (currentNoteId && currentNoteId !== prevNoteId) {
            this.setState({
                title: this.props.note.title,
                body: this.props.note.body
            });
        };
    }
    handleModalClose() {
        this.setState({ modalIsOpen: false })
    }
    onDeleteNote() {
        this.props.call('notes.remove', this.props.note._id)
        this.props.browserHistory.push("/dashboard")
        this.handleModalClose()
    }
    render() {
        if (this.props.note) {
            return (
                <div className="editor">
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        contentLabel="Add Link"
                        ariaHideApp={false}
                        onRequestClose={this.handleModalClose}
                        shouldCloseOnEsc={true}
                        shouldCloseOnOverlayClick={true}
                        className="boxed-view__box"
                        overlayClassName="boxed-view boxed-view--modal"
                    >
                        <h1>Confirm</h1>
                        <p>Are you sure that you want to delete</p>
                        <form onSubmit={(e) => e.preventDefault()}className="boxed-view__form">
                            <button ref="delete" className="button button-danger" onClick={this.onDeleteNote}>Delete</button>
                            <br/>
                            <button className="button button--secondary" onClick={this.handleModalClose} type="button ">Cancel</button>
                        </form>
                    </Modal>
                    <input
                        value={this.state.title}
                        placeholder="Untitled Note"
                        onChange={this.handleTitleChange}
                        className="editor__title"
                    />
                    <textarea
                        value={this.state.body}
                        placeholder="Enter note here..."
                        onChange={this.handleBodyChange}
                        className="editor__body"
                    ></textarea>
                    <div>
                        <button onClick={() => {
                            this.setState({
                                modalIsOpen: true
                            })
                        }}
                        className="button button-danger">Delete Note</button>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="editor">
                    <p className="editor__message">{(this.props.selectedNoteId) ? "Note not found" : "Pick or create a note to get started."}</p>
                </div>
            )
        }
    }
};

// PropTypes definition
Editor.propTypes = {
    note: PropTypes.object,
    selectedNoteId: PropTypes.string,
    call: PropTypes.func.isRequired,
    browserHistory: PropTypes.object.isRequired
}

// Default Export
export default createContainer(() => {
    const selectedNoteId = Session.get('selectedNoteId');

    return {
        selectedNoteId,
        note: Notes.findOne(selectedNoteId),
        call: Meteor.call,
        browserHistory
    }
}, Editor);