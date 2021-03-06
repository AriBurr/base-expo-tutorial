/*
  userLocation.js
    Betterment Labs
    Created by BettermentLabs.
    Copyright © 2018 Betterment Labs, LLC. All rights reserved.

    Description:
      Root functions for managing redux store
*/
// Action Definitions
export const setUserInfoTo = userInfo => {
  return { type: 'SET_USER_INFO_TO', userInfo: userInfo };
};
export const setUserLongitudeTo = longitude => {
  return { type: 'SET_USER_LONGITUDE_TO', longitude: longitude };
};
export const setUserLatitudeTo = latitude => {
  return { type: 'SET_USER_LATITUDE_TO', latitude: latitude };
};
export const setDeviceIsFetchingLocation = {
  type: 'SET_DEVICE_IS_FETCHING_LOCATION'
};
export const setDeviceIsNotFetchingLocation = {
  type: 'SET_DEVICE_IS_NOT_FETCHING_LOCATION'
};

const defaultLocationState = { longitude: null, latitude: null };

const userLocationReducer = (state = defaultLocationState, action) => {
  // console.log(action);
  switch (action.type) {
    case setUserLongitudeTo().type:
      return Object.assign({}, state, { longitude: action.longitude });
    case setUserLatitudeTo().type:
      return Object.assign({}, state, { latitude: action.latitude });
    case setDeviceIsFetchingLocation.type:
      return Object.assign({}, state, {deviceIsGettingLocation: true});
    case setDeviceIsNotFetchingLocation.type:
      return Object.assign({}, state, {deviceIsGettingLocation: false});
  }
  return state;
};

// export default props to be loaded for all views
export const userLocation = {
  name: 'userLocationState',
  reducer: userLocationReducer
};
export default (userLocationSection = {
  userLocation: userLocation
});
