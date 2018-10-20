import React from 'react';
import { Accounts } from "meteor/accounts-base";
import { createContainer } from 'meteor/react-meteor-data'
import PropTypes from 'prop-types'
import { Session } from 'meteor/session';
export const PrivateHeader = (props) => {
    const navImgSrc = props.isNavOpen ? "/images/x.svg" : "/images/bars.svg"
    return (
        <div className="header">
            <div className="header__content">
                <img src={navImgSrc} onClick={() => Session.set('isNavOpen', !Session.get('isNavOpen'))} className="header__nav-toggle"/>
                <h1 className="header__title">{props.title}</h1>
                <button onClick={() => props.handleLogout()} className="button button--header">Logout</button>
            </div>
        </div>
    )
}

PrivateHeader.propTypes = {
    title: PropTypes.string.isRequired,
    handleLogout: PropTypes.func.isRequired,
    isNavOpen: PropTypes.bool.isRequired
}

export default createContainer(() => {
    return {
        handleLogout: () => Accounts.logout(),
        Session,
        isNavOpen: Session.get('isNavOpen')
    }
}, PrivateHeader)

