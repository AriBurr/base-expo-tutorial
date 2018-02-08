/*
  index.js
    top-level store organizing file
    Betterment Labs
    Created by BettermentLabs. 
    Copyright © 2018 Betterment Labs, LLC. All rights reserved.

    Description:
      Root functions for managing redux store
*/
// IMPORTS
// Import Other Node Modules
import { createStore, combineReducers } from 'redux';

// import general logic
import {getStoreSubscriptionObjectFrom, combineReducersObjectFrom, addPropsRequestFromStore} from './helpers';

// Import Base Stores
import loadingReducer from './loading';

// Import App's Stores
import appStoreSections from '../../../src/logic/store/appStoreSections';

// Action Definitions
export const setAppLanguageTo = (language) => {return ({type: 'SET_APP_LANGUAGE', language: language})};
export const setAppStringsTo = (strings) => {return ({type: 'SET_APP_STRINGS', strings: strings})};
export const setAppImagesTo = (images) => {return ({type: 'SET_APP_IMAGES', images: images})};
export const setAppStylesTo = (styles) => {return ({type: 'SET_APP_STYLES', styles: styles})};

const stylesReducers = (state = {}, action) => {
  switch (action.type) {
    case setAppStylesTo().type:
      return Object.assign({}, state, action.styles)
    }
  return state
}

const imagesReducer = (state = {}, action) => {
  switch (action.type) {
    case setAppImagesTo().type:
      return Object.assign({}, state, action.images)
  }
  return state
}

const stringsReducer = (state = {}, action) => {
  switch (action.type) {
    case setAppLanguageTo().type:
      return Object.assign({}, state, {language: action.language})
    case setAppStringsTo().type: // not currently used
      return Object.assign({}, state, action.strings)
  }
  return state
}

// export default props to be loaded for all views
export const loading = {name: 'loadingState', reducer: loadingReducer};
export const styles = {name: 'stylesState', reducer: stylesReducers};
export const images = {name: 'imageState', reducer: imagesReducer};
export const strings = {name: 'stringsState', reducer: stringsReducer};

const essentialStoreSections ={
  loading: loading,
  styles: styles,
  images: images,
  strings: strings,
}

export const allStoreSections = Object.assign({}, essentialStoreSections, (appStoreSections ? appStoreSections : {}));

export const defaultInterfacePropsFrom = (store) => {
  const storeSubscriptionObject = getStoreSubscriptionObjectFrom({
    styles: styles,
    images: images,
    strings: strings,
  }, store);
  return(storeSubscriptionObject)
}

const createAppStore = () => {
  const reducersToCombine = combineReducersObjectFrom(allStoreSections);
  const combinedReducers = combineReducers(reducersToCombine);
  return(combinedReducers)
}

export default store = createStore(createAppStore())