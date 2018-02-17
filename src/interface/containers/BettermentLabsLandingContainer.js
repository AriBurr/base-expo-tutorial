/*
  BettermentLabsLandingContainer.js
    Betterment Labs
    Created by BettermentLabs. 
    Copyright © 2018 Betterment Labs, LLC. All rights reserved.

Component BettermentLabsLandingContainer.js
  Description:
*/
// IMPORTS
// Import React Modules
import React from 'react';
import { connect } from 'react-redux';

// Import Core Project Modules
import BRoute from '../../../base/interface/routers/BRoute';

// Import App Logic
import {appPhonebook} from '../../logic/store/appPhonebook';
import {requestNotifications} from '../../../base/logic/permissions';
import saveContactFromPhonesPhoneBook from '../../logic/loading/saveContactFromPhonesPhoneBook';
import {getRemoveContactFromAppPhonebookWithDispatch} from '../../logic/store/appPhonebook';

// Import Other App UI Elements
import BettermentLabsLandingPage from '../dumbViews/BettermentLabsLandingPage';

export default BettermentLabsLandingContainer = (props) => {
    const dispatcher = props.dispatch ? {dispatch: props.dispatch} : null;
    const thisSaveContactFromPhonesPhoneBook = () => saveContactFromPhonesPhoneBook(dispatcher);
    const thisRemoveContactFromAppPhonebook = props.dispatch ? (contactIndex) => getRemoveContactFromAppPhonebookWithDispatch({contactIndex: contactIndex, dispatcher: props.dispatch}) : null;
    const ThisViewWithStore = connect(mapStateToProps)(BettermentLabsLandingPage);
    return(
        <ThisViewWithStore
            requestNotifications={requestNotifications}
            saveContactFromPhonesPhoneBook={thisSaveContactFromPhonesPhoneBook}
            removeContactFromPhonesPhoneBook={thisRemoveContactFromAppPhonebook}
            {...props} />
    )
}

const mapStateToProps = function(store) {
    return({contacts: store[appPhonebook.name]});
  }
