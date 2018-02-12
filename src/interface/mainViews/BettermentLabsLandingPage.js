/*
  BettermentLabsLandingPage.js
    Betterment Labs
    Created by BettermentLabs. 
    Copyright © 2018 Betterment Labs, LLC. All rights reserved.

Component BettermentLabsLandingPage.js
  Description:  landing page
*/

// IMPORTS
// Import React Modules
import React from 'react';

// Import Other Node Modules
import styled, {ThemeProvider} from 'styled-components';

// Import Core Project Modules

// Import App Logic
import {requestNotifications} from '../../../base/logic/permissions';

// Import Other App UI Elements
import ImageWithAspect from '../../../base/interface/components/ImageWithAspect';
import {defaultAppStyles} from '../../../base/interface/theming/AppStyles';
import BButton from '../components/BButton';

// Interface Styling
const MainView = styled.View`flex:1;
    background: ${({theme}) => (theme.color.background)};
    justify-content: flex-end`;

const ViewSpacer = styled.View`flex:1`;

const Header = styled.Text`flex:10;
    fontFamily: ${({theme}) => theme.fontStyles.bold};
    color: ${({theme}) => theme.color.highlight};
    fontSize: ${({theme}) => theme.fontSizes.large}`

const ImageView = styled.View`flex:17;
    justify-content: flex-end;
    marginBottom: -2%`
    
export default BettermentLabsLandingPage = (props) => {
        const style = props.styles || defaultAppStyles;
        const strings = props.strings || null;
        const images = props.images || null;
        const imageLogo = images ? images.logoTextWhite || false : false;

        const logoImage = (<ImageView>{imageLogo && (<ImageWithAspect source={imageLogo} />)}</ImageView>);

        const mainView = 
            (<ThemeProvider theme={style}>
                <MainView>
                    <ViewSpacer/>
                    <Header>{strings.title}</Header>
                    <ViewSpacer/>
                    <BButton
                        flex={2}
                        text={strings.notificationsRequestButton}
                        onPress={requestNotifications}
                    />
                    {logoImage}
                </MainView>
            </ThemeProvider>)
      return ( mainView)
  }