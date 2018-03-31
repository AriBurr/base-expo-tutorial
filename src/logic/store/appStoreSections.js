/*
  appStoreSections.js
    top-level app store organizing file
    Betterment Labs
    Created by BettermentLabs.
    Copyright © 2018 Betterment Labs, LLC. All rights reserved.
*/

// Import Store Files
import setUserInfoSection from './userInfo';
import setAppPhonebookSection from './appPhonebook';
import userLocationSection from './userLocation';
import {MainRouterStoreSection} from '../../../src/interface/routers/MainRouter';

export default appStoreSections =
  Object.assign({},
    setUserInfoSection,
    setAppPhonebookSection,
    userLocationSection,  
    MainRouterStoreSection,
  );
