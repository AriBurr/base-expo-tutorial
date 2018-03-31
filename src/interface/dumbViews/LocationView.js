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

// Import Other Node Modules
import styled, { ThemeProvider } from 'styled-components';

// Import Core Project Modules

// Import App Logic
import { MainRouterGoBack } from '../../../src/interface/routers/MainRouter';

// Import Other App UI Elements
import { defaultAppStyles } from '../../../base/interface/theming/AppStyles';
import LocationTextDisplayContainer from '../containers/LocationTextDisplayContainer';
import BNestedViewNavBar from '../../../base/interface/components/BNestedViewNavBar';

// Interface Styling
const MainView = styled.View`
  flex: 1;
  background: ${({ theme }) => theme.color.background};
  justify-content: flex-end;
`;

const ViewSpacer = styled.View`
  flex: 1;
`;

export default (LocationView = props => {
  const style = props.styles || defaultAppStyles;
  const strings = props.strings || null;
  const images = props.images || null;
  const imageLogo = images ? images.logoTextWhite || false : false;
  const thisGoBack = props.dispatch ? MainRouterGoBack(props.dispatch) : null;

  const mainView = (
    <ThemeProvider theme={style}>
      <MainView>
        <BNestedViewNavBar BackFunc={thisGoBack} />
        <ViewSpacer />
        <LocationTextDisplayContainer />
        <ViewSpacer />
      </MainView>
    </ThemeProvider>
  );
  return mainView;
});
