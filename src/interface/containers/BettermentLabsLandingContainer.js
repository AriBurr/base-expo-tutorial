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

// Import App Logic
import {appPhonebook} from '../../logic/store/appPhonebook';
import {marketplace} from '../../../base/logic/store/marketplace';
import {
  requestNotifications,
  requestLocation,
  checkNotificationsPermissions
  } from '../../../base/logic/permissions';
import saveContactFromPhonesPhoneBook from '../../logic/loading/saveContactFromPhonesPhoneBook';
import {getRemoveContactFromAppPhonebookWithDispatch} from '../../logic/store/appPhonebook';
import {
  SendOneSignalTag,
  GetOneSignalTags,
  CheckOneSignalSubscriptionStatus
  } from '../../../base/logic/notifications/OneSignalSupport';
import purchaseProductWithDispatch, {consumeProductWithDispatch} from '../../../base/logic/purchases';

// Import Other App UI Elements
import BettermentLabsLandingPage from '../dumbViews/BettermentLabsLandingPage';
// UI Logic
import {getMainRouterGoToSwipeableExample} from '../routers/MainRouter';
import {getUpdateStoreWithCurrentLocationFunc} from '../../logic/location/locationServices';

export default BettermentLabsLandingContainer = (props) => {
    const strings = props.strings || null;

    const dispatcher = props.dispatch ? {dispatch: props.dispatch} : null;
    const thisRemoveContactFromAppPhonebook = props.dispatch ? (contactIndex) => getRemoveContactFromAppPhonebookWithDispatch({contactIndex: contactIndex, dispatcher: props.dispatch}) : null;
    const ViewButtons = [
      {title: strings.getLocationButton,
        onPress: getUpdateStoreWithCurrentLocationFunc(dispatcher)
      },
      {title: strings.goToSwipeableExample,
        onPress: getMainRouterGoToSwipeableExample(dispatcher)
      },
      {title: strings.checkPermissions,
        onPress: checkNotificationsPermissions
      },
      {title: strings.notificationsRequestButton,
        onPress: requestNotifications
      },
      {title: strings.locationPermissionsRequest,
        onPress: requestLocation
      },
      { title: strings.sendTestOneSignalTag,
        onPress: () => {
          SendOneSignalTag({key0: "value0", key1: "value1", key2: "value2"});
        }
      },
      {title: strings.checkOneSignalSubscription,
        onPress: CheckOneSignalSubscriptionStatus
      },
      {title: strings.checkOneSignalTags,
        onPress: GetOneSignalTags
      },
      {title: strings.getContactButton,
        onPress: () => saveContactFromPhonesPhoneBook(dispatcher)
      },
    ];
    const ThisViewWithStore = connect(mapStateToProps)(BettermentLabsLandingPage);
    return(
        <ThisViewWithStore
          buttons={ViewButtons}
          purchaseFunction={purchaseProductWithDispatch(dispatcher)}
          consumeFunction={consumeProductWithDispatch(dispatcher)}
          removeContactFromPhonesPhoneBook={thisRemoveContactFromAppPhonebook}
          {...props} />
    )
}

const mapStateToProps = function(store) {
    return({contacts: store[appPhonebook.name], marketplace: store[marketplace.name]});
  }
