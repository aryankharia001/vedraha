// store.js
import { configureStore } from '@reduxjs/toolkit';
// No need to import thunk as it's included by default in Redux Toolkit

import { cartReducer } from './reducers/cartReducers';
import { 
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
  adminLoginReducer,
  passwordResetReducer
} from './reducers/userReducers';
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderDeliverReducer,
  orderListMyReducer,
  orderListReducer,
} from './reducers/orderReducers';
// Add collection reducers import
import {
  collectionListReducer,
  collectionDetailsReducer,
  collectionProductsReducer,
  collectionCreateReducer,
  collectionUpdateReducer,
  collectionDeleteReducer,
} from './reducers/collectionReducers';
// Add landing product reducers import
import {
  landingProductListReducer,
  landingProductDetailsReducer,
  landingProductCreateReducer,
  landingProductUpdateReducer,
  landingProductDeleteReducer,
  landingProductReviewCreateReducer,
} from './reducers/productReducers';

// Get cart items from localStorage if available
const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

// Get user info from localStorage if available
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

// Get shipping address from localStorage if available
const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {};

// Initial state with data from localStorage
const initialState = {
  cart: { 
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage 
  },
  userLogin: { userInfo: userInfoFromStorage },
};

// Configure store with all reducers
const store = configureStore({
  reducer: {
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    adminLogin: adminLoginReducer,
    passwordReset: passwordResetReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderDeliver: orderDeliverReducer,
    orderListMy: orderListMyReducer,
    orderList: orderListReducer,
    // Add collection reducers
    collectionList: collectionListReducer,
    collectionDetails: collectionDetailsReducer,
    collectionProducts: collectionProductsReducer,
    collectionCreate: collectionCreateReducer,
    collectionUpdate: collectionUpdateReducer,
    collectionDelete: collectionDeleteReducer,
    // Add landing product reducers
    landingProductList:         landingProductListReducer,
    landingProductDetails:      landingProductDetailsReducer,
    landingProductCreate:       landingProductCreateReducer,
    landingProductUpdate:       landingProductUpdateReducer,
    landingProductDelete:       landingProductDeleteReducer,
    landingProductReviewCreate: landingProductReviewCreateReducer,
  },
  // Redux Toolkit includes thunk middleware by default
  preloadedState: initialState,
});

export default store;