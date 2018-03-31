/*
LocationTextDisplay.js
    Betterment Labs
    Created by BettermentLabs.
    Copyright © 2018 Betterment Labs, LLC. All rights reserved.

Component LocationTextDisplay.js
Description: Displays text form of a location, e.g.:
        Latitude: 10.435
        Longitude: 123.235

Inputs: object 'props'
    includes all typical React & base project props
    location:
        lat:    latitude value
        lon:    longitude value
Outputs:
    renders text per description above
*/
// IMPORTS
// Import React Modules
import React from 'react';

// Import Other Node Modules
import styled from 'styled-components';
// Import Other App Logic
import getPageStrings from '../../../base/logic/strings/getPageStrings';

// Import Other App UI Elements
import BText from '../../../base/interface/components/BText';

const LocationView = styled.View`
  flex: ${({ flex }) => flex || 1};
  align-self: center;
  justify-content: center;
  width: ${({ width }) => width || '80%'};
`;

const Label = BText.extend`
  text-align: right;
`;

const ValueLabel = BText.extend`
  text-align: left;
`;

const RowSection = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
`;

export default (LocationTextDisplay = props => {
  return (
    <LocationView flex={props.flex || null} width={props.width || null}>
      <RowSection>
        <Label>Latitude:</Label>
        <ValueLabel>{props.lat}</ValueLabel>
      </RowSection>
      <RowSection>
        <Label>Longitude:</Label>
        <ValueLabel>{props.lon}</ValueLabel>
      </RowSection>
    </LocationView>
  );
});
