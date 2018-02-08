/*
  AppLaunchLogic.js
    CanonicalAppName
    Created by BettermentLabs. 
    Copyright © 2018 Betterment Labs, LLC. All rights reserved.

export Function AppLaunch
  Description:  main app launch logic
*/
// IMPORTS

// Import Core Project Modules
import BaseAppLaunch from '../../base/logic/BaseAppLaunchLogic';

export default AppLaunch = (dispatch) => {
    BaseAppLaunch(dispatch || null);
}
