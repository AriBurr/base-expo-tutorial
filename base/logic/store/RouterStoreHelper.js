/*
  MainRouterStore.js
    Betterment Labs
    Created by BettermentLabs. 
    Copyright © 2018 Betterment Labs, LLC. All rights reserved.

    Description:
      Root functions for managing redux store
*/
// IMPORTS
// Import React Modules
import React from 'react';

// Import Project Logic
import isFunction from '../../../base/logic/jsExtend/isFunction';
import {isObject} from '../../../base/logic/jsExtend/objectMerge';

const storeNameSuffix = 'Store';
const stateNameSuffix = 'State';
const goActionSuffix = '_GO';
const backActionSuffix = '_BACK';
const forwardActionSuffix = '_FORWARD';

export const getStoreSection = (routesObject) => {
  const thisRoutesObject = (routesObject.routesArray != undefined && routesObject.routesArray != null) ? 
    getRoutesObjectFromArray({routesArray: routesObject.routesArray}) :
    routesObject

  const newObj = {};
  newObj[routesObject.routerName+storeNameSuffix] = {
    name: routesObject.routerName+stateNameSuffix,
    reducer: getRouterReducer(thisRoutesObject)
  }
  return(newObj)
}

export const getRouterGoTo = (routesObject) => {
  const routesObjectName = routesObject.RoutesName;
  return(
    (page) => {return({type: routesObjectName+goActionSuffix, page: page})}
  )
}

export const getRouterGoBack = (routesObject) => {
  const routesObjectName = routesObject.RoutesName;
    return({type: routesObjectName+backActionSuffix})
}

export const getRouterGoForward = (routesObject) => {
  const routesObjectName = routesObject.RoutesName;
    return({type: routesObjectName+forwardActionSuffix})
}

export const getRouterReducer = (routesObject) => {
  const routesObjectName = routesObject.RoutesName;
  const defaultRoute = {
    location: routesObject.Home ? routesObject.Home : getFirstAvailableObjectInObject(routesObject),
    history: []
  };
  const reducer = (state = defaultRoute, action) => {
    const history = state.history.slice();
    history.push(state.location);
    switch (action.type) {
      case (routesObjectName+goActionSuffix):
        return Object.assign({}, state, {location: action.page, history: history})
      case (routesObjectName+backActionSuffix):
        return Object.assign({}, state, {location: state.history.slice(-1)[0] , history: history})
    }
    return state
  };
  return(reducer)
}

export const getFirstAvailableObjectInObject = (object) => {
  return(object[getFirstAvailableKey(object)])
}

export const getFirstAvailableKey = (object) => {
  for (const key in object) {
    if (object[key]) {
      return key
    }
  }
}

export const getCurrentView = ({view, routeProps, mapStateToProps}) => {
  if (isFunction(view)) {
    const allStrings = Object.assign({}, getPageStrings(view.name),(routeProps ? routeProps.strings ? routeProps.strings : {} : {}));
    LogRoute(view.name);
    const viewToRender = (mapStateToProps) ? connect(mapStateToProps)(view) : view;
    const allRouteProps = Object.assign({},routeProps ? routeProps : {}, {strings: allStrings});
    return React.createElement(viewToRender, allRouteProps)  
  } else {
    if (!isObject(view)) {return null};
    return getCurrentView({
      view: view.routesArray,
      routeProps: routeProps,
      mapStateToProps: mapStateToProps})
  }
}

export const LogRoute = (routeName) => {
  console.log("LogRoute: "+routeName);
}

const getRoutesObjectFromArray = ({routerName = 'unnamedRouter', routesArray}) => {
  const routesObject = {};
  routesObject.routerName = routerName;
  routesArray.map((route, index) => {
      routesObject[routerName+index] = route;
  })
  return routesObject
}
