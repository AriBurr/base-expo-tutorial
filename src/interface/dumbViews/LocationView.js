/*
  LocationView.js
    Betterment Labs
    Created by BettermentLabs.
    Copyright © 2018 Betterment Labs, LLC. All rights reserved.
Component LocationView.js
  Description:
    Displays the device's current location
*/

// IMPORTS
// Import React Modules

import React from 'react';

export default (LocationView = props => (
  <div>
    <Label>Latitude</Label>
    <Value>{props.location.lat}</Value>
    <Label>Longitude</Label>
    <Value>{props.location.lon}</Value>
  </div>
));
