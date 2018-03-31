/*
  LocationTextDisplayContainer.js
    Betterment Labs
    Created by BettermentLabs.
    Copyright © 2018 Betterment Labs, LLC. All rights reserved.
Component LocationTextDisplayContainer.js
  Description:
*/
// IMPORTS
// Import React Modules
import React from 'react';
import { connect } from 'react-redux';

// Import App Logic
import { allStoreSections } from '../../../base/logic/store';

// Import Other App UI Elements
import LocationTextDisplay from '../components/LocationTextDisplay';

export const LocationTextDisplayContainer = props => {
  return (
    <LocationTextDisplay
      lat={props.location.latitude}
      lon={props.location.longitude}
    />
  );
};

const mapStateToProps = function(store) {
  return { location: store[allStoreSections.userLocation.name] }; // as set in src/logic/store/userLocation.js
};

export default connect(mapStateToProps)(LocationTextDisplayContainer);
