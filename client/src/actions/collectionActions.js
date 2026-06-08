// actions/collectionActions.js
import axios from 'axios';
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
  COLLECTION_UPDATE_REQUEST,
  COLLECTION_UPDATE_SUCCESS,
  COLLECTION_UPDATE_FAIL,
  COLLECTION_DELETE_REQUEST,
  COLLECTION_DELETE_SUCCESS,
  COLLECTION_DELETE_FAIL,
} from '../constants/collectionConstants';
import { backendurl } from '../App';

// Action to fetch all collections
export const listCollections = () => async (dispatch) => {
  try {
    dispatch({ type: COLLECTION_LIST_REQUEST });

    const { data } = await axios.get(`${backendurl}/api/collections`);

    dispatch({
      type: COLLECTION_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COLLECTION_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Action to fetch collection details
export const getCollectionDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: COLLECTION_DETAILS_REQUEST });

    const { data } = await axios.get(`${backendurl}/api/collections/${id}`);

    dispatch({
      type: COLLECTION_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COLLECTION_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Action to fetch products in a collection
export const getCollectionProducts = (id, page = 1, limit = 12) => async (dispatch) => {
  try {
    dispatch({ type: COLLECTION_PRODUCTS_REQUEST });

    const { data } = await axios.get(
      `${backendurl}/api/collections/${id}/products?page=${page}&limit=${limit}`
    );

    dispatch({
      type: COLLECTION_PRODUCTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COLLECTION_PRODUCTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Action to create a collection (admin only)
export const createCollection = (collectionData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COLLECTION_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
      withCredentials: true,
    };

    console.log("collection action")

    const { data } = await axios.post(`${backendurl}/api/collections/create`, collectionData, config);

    dispatch({
      type: COLLECTION_CREATE_SUCCESS,
      payload: data,
    });

    return data;
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    
    dispatch({
      type: COLLECTION_CREATE_FAIL,
      payload: message,
    });
  }
};

// Action to update a collection (admin only)
export const updateCollection = (id, formData) => async (dispatch, getState) => {
  try {
    // console.log("collection : ", collection)
    dispatch({
      type: COLLECTION_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
      withCredentials: true,
    };

    const { data } = await axios.put(
      `${backendurl}/api/collections/${id}`,
      formData,
      config
    );

    dispatch({
      type: COLLECTION_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    
    dispatch({
      type: COLLECTION_UPDATE_FAIL,
      payload: message,
    });
  }
};

// Action to delete a collection (admin only)
export const deleteCollection = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COLLECTION_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
      withCredentials: true,
    };

    await axios.delete(`${backendurl}/api/collections/${id}`, config);

    dispatch({
      type: COLLECTION_DELETE_SUCCESS,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    
    dispatch({
      type: COLLECTION_DELETE_FAIL,
      payload: message,
    });
  }
};