/*
  BNestedViewNavBar.js
    Betterment Labs
    Created by BettermentLabs.
    Copyright © 2018 Betterment Labs, LLC. All rights reserved.

Component BNestedViewNavBar.js
  Description: Displays basic nav bar

  Inputs: object 'props'
    includes all typical React & base project props
    onPress: function that pressing on button calls (should be redux store action)

  Outputs:
    renders button per description above
*/

// IMPORTS
// Import React Modules
import React from 'react';

// Import Other Node Modules
import styled from 'styled-components';

// Import App Logic
import getPageStrings from '../../logic/strings/getPageStrings';

// Import Other App UI Elements
import BButton from '../../../base/interface/components/BButton';
import BText from './BText';

const MainView = styled.View`height:50px;
    background: ${({theme}) => (theme.color.highlight)};
    justify-content: space-between`;

// const BothButtonView = ButtonView.extend``;

const BothButtonView = styled.View`flex:${({flex}) => flex || 1};
    width: 50%;
    justify-content: center;
    borderColor: ${({theme}) => theme.color.highlight};`

const LeftButtonView = BothButtonView.extend``;

const RightButtonView = BothButtonView.extend``;

const BothButtonText = BText.extend`
    color: ${({theme}) => theme.color.background};`

const LeftButtonText = BothButtonText.extend`
    margin-left: 20px;
    text-align: left;`;

const RightButtonText = BothButtonText.extend`
    margin-right: 20px;
    text-align: right;`;

export default BNestedViewNavBar = (props) => {
    const defaultStrings = getPageStrings('BasicNavStrings');
    const BackFunc = props.BackFunc ? props.BackFunc : null;
    const ForwardFunc = props.ForwardFunc ? props.ForwardFunc : null;
    const BackText = props.BackText ? props.BackText : defaultStrings.back;
    const ForwardText = props.ForwardText ? props.ForwardText : defaultStrings.forward;
    return(
        <MainView>
            {BackFunc && <BButton ButtonView={LeftButtonView} ButtonText={LeftButtonText} onPress={BackFunc} text={BackText} {...props} />}
            {ForwardFunc && <BButton ButtonView={RightButtonView} ButtonText={RightButtonText} onPress={ForwardFunc} text={ForwardText} {...props} />}
        </MainView>
    )
}
