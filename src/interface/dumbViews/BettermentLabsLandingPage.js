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

// Import Other App UI Elements
import {BHeader} from '../../../base/interface/components/BText';
import LocationTextDisplayContainer from '../../../src/interface/containers/LocationTextDisplayContainer';
import ImageWithAspect from '../../../base/interface/components/ImageWithAspect';
import {defaultAppStyles} from '../../../base/interface/theming/AppStyles';
import BRoundedButton from '../../../base/interface/components/BRoundedButton';
import BButton, {ButtonView} from '../../../base/interface/components/BButton';
import getContactCard from '../components/getContactCard';
import getMarketplaceItemCard from '../components/getMarketplaceItemCard';
import getProductCard from '../components/getProductCard';

// Interface Styling
const ButtonEnclosingView = styled.View`flex:2`;

const MainView = styled.View`flex:1;
    flex-direction: column;
    background: ${({theme}) => (theme.color.background)};
    justify-content: flex-end`;

const ScrollView = styled.ScrollView`
    height:100%;`;

const ViewSpacer = styled.View`height: 20px`;

const MarketplaceHeader = BHeader.extend`
    font-size: ${({theme}) => theme.fontSizes.medium};`;

const StoreItemButtonView = ButtonView.extend`
    width: 100%
`
const ScrollViewBottomSpacer = styled.View`height: 200px`;

const ImageView = styled.View`height:25%;
    position: absolute;
    background: rgba(52, 52, 52, 0);
    justify-content: flex-end;
    align-self: flex-end;
    marginRight: -5%;
    marginBottom: -2%`

const PageButtons = (PageButtonArray) => {
    var JSXButtons = [];
    PageButtonArray.map((buttonObject, index) => {
        const JSXButton = (
            <ButtonEnclosingView
                key={index}
            >
                <ViewSpacer/>
                <BRoundedButton
                    title={buttonObject.title || ''}
                    onPress={buttonObject.onPress || null}
                />
            </ButtonEnclosingView>
        )
        JSXButtons.push(JSXButton);
    })
    return(JSXButtons);
}

export default BettermentLabsLandingPage = (props) => {
    // console.log(props);
    // console.log("props.marketplace");
    // console.log(props.marketplace);
    const style = props.styles || defaultAppStyles;
    const strings = props.strings || null;
    const images = props.images || null;
    const imageLogo = images ? images.logoTextWhiteBlueMountains || false : false;
    const contacts = props.contacts ?
        props.contacts.map((contact, index) => getContactCard({contact: contact, index: index, removeContactFromPhonesPhoneBook: props.removeContactFromPhonesPhoneBook || null}))
        : null;

    const logoImage =  (<ImageView>{imageLogo && (<ImageWithAspect source={imageLogo} />)}</ImageView>);

    const Buttons = props.buttons ? PageButtons(props.buttons) : null;
    const ProductsButtons = (props.marketplace && props.marketplace.MarketPlaceProducts) ?
        props.marketplace.MarketPlaceProducts.map(
            (marketplaceItem, index) =>
                getMarketplaceItemCard({
                    marketplaceItem: marketplaceItem,
                    index: index,
                    purchaseFunction: props.purchaseFunction}))
            : null;

    const PurchasedProducts = (props.marketplace && props.marketplace.PurchasedProducts) ?
        props.marketplace.PurchasedProducts.map(
            (product, index) =>
                {
                const ProductButton =
                    (props.consumeFunction
                        && product
                        && product.productID == 'consumableProdID') ?
                        (<BRoundedButton
                            title={'CONSUME'}
                            onPress={() => props.consumeFunction({productID: product.identifier})}/>)
                        : null;

                return (getProductCard({
                    productState: 'purchased',
                    product: product,
                    index: index,
                    productButton: ProductButton}))})
        : null;

    const FailedTransactions = (props.marketplace && props.marketplace.FailedTransactions) ?
        props.marketplace.FailedTransactions.map(
            (product, index) =>
                getProductCard({
                    productState: 'failed',
                    product: product,
                    index: index}))
        : null;

    const AttemptedTransactions = (props.marketplace && props.marketplace.AttemptedTransactions) ?
        props.marketplace.AttemptedTransactions.map(
            (product, index) =>
                getProductCard({
                    productState: 'attempted',
                    product: product,
                    index: index}))
        : null;

    const ConsumedProducts = (props.marketplace && props.marketplace.ConsumedProducts) ?
        props.marketplace.ConsumedProducts.map(
            (product, index) =>
                getProductCard({
                    productState: 'consumed',
                    product: product,
                    index: index}))
        : null;

        const mainView =
        (<ThemeProvider theme={style}>
            <MainView>
                <ScrollView>
                  <BHeader>{strings.title}</BHeader>
                  <LocationTextDisplayContainer />
                  <ViewSpacer/>
                  {Buttons}
                  <ViewSpacer/>
                  {contacts}
                  <ViewSpacer/>
                  <MarketplaceHeader>{strings.storeHeaderTitle}</MarketplaceHeader>
                  {ProductsButtons}
                  <MarketplaceHeader>{strings.purchasedProductsTitle}</MarketplaceHeader>
                  {PurchasedProducts}
                  <MarketplaceHeader>{strings.failedPurchasesTitle}</MarketplaceHeader>
                  {FailedTransactions}
                  <MarketplaceHeader>{strings.attemptedPurchasesTitle}</MarketplaceHeader>
                  {AttemptedTransactions}
                  <MarketplaceHeader>{strings.consumedProductsTitle}</MarketplaceHeader>
                  {ConsumedProducts}
                  <ScrollViewBottomSpacer/>
                </ScrollView>
                {logoImage}
            </MainView>
        </ThemeProvider>)
    return ( mainView)
  }
