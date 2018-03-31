/*
	locationServices.js
	  Betterment Labs
	  Updated by Charles Major on 2/1/18.
	  Copyright © 2018 Betterment Labs. All rights reserved.
*/
// Import App Logic
import {
  setUserLongitudeTo,
  setUserLatitudeTo,
  setDeviceIsFetchingLocation,
  setDeviceIsNotFetchingLocation
} from '../store/userLocation';

const getCurrentLocation = callback => {
  navigator.geolocation.getCurrentPosition(
    // position is an object with property coords: {latitude: #, longitude: #}
    position => {
      console.log(position);
      callback && callback({ error: false, content: position });
    },
    error => callback && callback({ error: true, errorMessage: error })
    //   { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
  );
};

// this function takes a redux store dispatcher as its input
export const updateStoreWithCurrentLocation = ({dispatch}) => {
  // first we'll tell the store we're going to try to update the location
  dispatch && dispatch(setDeviceIsFetchingLocation);
  // then we'll make our callback funtions
  const callbackFunc = result => {
    if (result.error) {
      // we still need to tell our store that we're no longer checking for the location
      dispatch && dispatch(setDeviceIsNotFetchingLocation);
      console.log(
        'Failed to get device location with error: ' + result.errorMessage
      );
    } else {
      const content = result.content;
      // get redux actions to set longitude & latitude
      const setUserLongitudeToAction = setUserLongitudeTo(
        content.coords.longitude
      );
      const setUserLatitudeToAction = setUserLatitudeTo(
        content.coords.latitude
      );
      dispatch && dispatch(setUserLongitudeToAction);
      dispatch && dispatch(setUserLatitudeToAction);
      // and we need to tell our store that we're no longer checking for the location
      dispatch && dispatch(setDeviceIsNotFetchingLocation);
    }
  };
  // and call!
  getCurrentLocation(callbackFunc);
};

// function to get the function with dispatch needed to update the store (for passing to dumb components)
export const getUpdateStoreWithCurrentLocationFunc = dispatch => {
  return () => updateStoreWithCurrentLocation(dispatch);
};
