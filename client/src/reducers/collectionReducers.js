// reducers/collectionReducers.js
import {
  COLLECTION_LIST_REQUEST,
  COLLECTION_LIST_SUCCESS,
  COLLECTION_LIST_FAIL,
  COLLECTION_DETAILS_REQUEST,
  COLLECTION_DETAILS_SUCCESS,
  COLLECTION_DETAILS_FAIL,
  COLLECTION_PRODUCTS_REQUEST,
  COLLECTION_PRODUCTS_SUCCESS,
  COLLECTION_PRODUCTS_FAIL,
  COLLECTION_CREATE_REQUEST,
  COLLECTION_CREATE_SUCCESS,
  COLLECTION_CREATE_FAIL,
  COLLECTION_CREATE_RESET,
  COLLECTION_UPDATE_REQUEST,
  COLLECTION_UPDATE_SUCCESS,
  COLLECTION_UPDATE_FAIL,
  COLLECTION_UPDATE_RESET,
  COLLECTION_DELETE_REQUEST,
  COLLECTION_DELETE_SUCCESS,
  COLLECTION_DELETE_FAIL,
} from '../constants/collectionConstants';

// Reducer for collection list
export const collectionListReducer = (state = { collections: [] }, action) => {
  switch (action.type) {
    case COLLECTION_LIST_REQUEST:
      return { loading: true, collections: [] };
    case COLLECTION_LIST_SUCCESS:
      return {
        loading: false,
        collections: action.payload,
      };
    case COLLECTION_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Reducer for collection details
export const collectionDetailsReducer = (
  state = { collection: {} },
  action
) => {
  switch (action.type) {
    case COLLECTION_DETAILS_REQUEST:
      return { ...state, loading: true };
    case COLLECTION_DETAILS_SUCCESS:
      return { loading: false, collection: action.payload };
    case COLLECTION_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Reducer for collection products
export const collectionProductsReducer = (
  state = { products: [], loading: false, error: null },
  action
) => {
  switch (action.type) {
    case COLLECTION_PRODUCTS_REQUEST:
      return { loading: true, products: [] };
    case COLLECTION_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        total: action.payload.total,
        collection: action.payload.collection,
      };
    case COLLECTION_PRODUCTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Reducer for collection creation (admin)
export const collectionCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case COLLECTION_CREATE_REQUEST:
      return { loading: true };
    case COLLECTION_CREATE_SUCCESS:
      return { loading: false, success: true, collection: action.payload };
    case COLLECTION_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case COLLECTION_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

// Reducer for collection update (admin)
export const collectionUpdateReducer = (state = { collection: {} }, action) => {
  switch (action.type) {
    case COLLECTION_UPDATE_REQUEST:
      return { loading: true };
    case COLLECTION_UPDATE_SUCCESS:
      return { loading: false, success: true, collection: action.payload };
    case COLLECTION_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case COLLECTION_UPDATE_RESET:
      return { collection: {} };
    default:
      return state;
  }
};

// Reducer for collection deletion (admin)
export const collectionDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case COLLECTION_DELETE_REQUEST:
      return { loading: true };
    case COLLECTION_DELETE_SUCCESS:
      return { loading: false, success: true };
    case COLLECTION_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};