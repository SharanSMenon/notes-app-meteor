import React from 'react';
import { Accounts } from "meteor/accounts-base";
import { createContainer } from 'meteor/react-meteor-data'
import PropTypes from 'prop-types'

export const PrivateHeader = (props) => {
    return (
        <div className="header">
            <div className="header__content">
                <h1>{props.title}</h1>
                <button onClick={() => props.handleLogout()} className="button button--header">Logout</button>
            </div>
        </div>
    )
}

PrivateHeader.propTypes = {
    title: PropTypes.string.isRequired,
    handleLogout: PropTypes.func.isRequired
}

export default createContainer(() => {
    return {
        handleLogout: () => Accounts.logout()
    }
}, PrivateHeader)

