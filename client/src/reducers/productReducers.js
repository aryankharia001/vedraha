// reducers/landingProductReducers.js
import {
  LANDING_PRODUCT_LIST_REQUEST,
  LANDING_PRODUCT_LIST_SUCCESS,
  LANDING_PRODUCT_LIST_FAIL,
  LANDING_PRODUCT_DETAILS_REQUEST,
  LANDING_PRODUCT_DETAILS_SUCCESS,
  LANDING_PRODUCT_DETAILS_FAIL,
  LANDING_PRODUCT_CREATE_REQUEST,
  LANDING_PRODUCT_CREATE_SUCCESS,
  LANDING_PRODUCT_CREATE_FAIL,
  LANDING_PRODUCT_CREATE_RESET,
  LANDING_PRODUCT_UPDATE_REQUEST,
  LANDING_PRODUCT_UPDATE_SUCCESS,
  LANDING_PRODUCT_UPDATE_FAIL,
  LANDING_PRODUCT_UPDATE_RESET,
  LANDING_PRODUCT_DELETE_REQUEST,
  LANDING_PRODUCT_DELETE_SUCCESS,
  LANDING_PRODUCT_DELETE_FAIL,
  LANDING_PRODUCT_CREATE_REVIEW_REQUEST,
  LANDING_PRODUCT_CREATE_REVIEW_SUCCESS,
  LANDING_PRODUCT_CREATE_REVIEW_FAIL,
  LANDING_PRODUCT_CREATE_REVIEW_RESET,
} from '../constants/productConstants';

export const landingProductListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case LANDING_PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    case LANDING_PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        pages:    action.payload.pages,
        page:     action.payload.page,
        total:    action.payload.total,
      };
    case LANDING_PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const landingProductDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case LANDING_PRODUCT_DETAILS_REQUEST:
      return { loading: true, product: {} };
    case LANDING_PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case LANDING_PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const landingProductCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case LANDING_PRODUCT_CREATE_REQUEST:
      return { loading: true };
    case LANDING_PRODUCT_CREATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case LANDING_PRODUCT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case LANDING_PRODUCT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const landingProductUpdateReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case LANDING_PRODUCT_UPDATE_REQUEST:
      return { loading: true };
    case LANDING_PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case LANDING_PRODUCT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case LANDING_PRODUCT_UPDATE_RESET:
      return { product: {} };
    default:
      return state;
  }
};

export const landingProductDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case LANDING_PRODUCT_DELETE_REQUEST:
      return { loading: true };
    case LANDING_PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case LANDING_PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const landingProductReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case LANDING_PRODUCT_CREATE_REVIEW_REQUEST:
      return { loading: true };
    case LANDING_PRODUCT_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true };
    case LANDING_PRODUCT_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload };
    case LANDING_PRODUCT_CREATE_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};