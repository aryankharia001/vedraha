// actions/landingProductActions.js
import axios from 'axios';
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
  LANDING_PRODUCT_UPDATE_REQUEST,
  LANDING_PRODUCT_UPDATE_SUCCESS,
  LANDING_PRODUCT_UPDATE_FAIL,
  LANDING_PRODUCT_DELETE_REQUEST,
  LANDING_PRODUCT_DELETE_SUCCESS,
  LANDING_PRODUCT_DELETE_FAIL,
  LANDING_PRODUCT_CREATE_REVIEW_REQUEST,
  LANDING_PRODUCT_CREATE_REVIEW_SUCCESS,
  LANDING_PRODUCT_CREATE_REVIEW_FAIL,
} from '../constants/productConstants';
import { backendurl } from '../App';

// ─── List all landing products ────────────────────────────────────────────────
export const listLandingProducts = (keyword = '', pageNumber = '', category = '') => async (dispatch) => {
  try {
    dispatch({ type: LANDING_PRODUCT_LIST_REQUEST });

    const { data } = await axios.get(
      `${backendurl}/api/products`
    );

    // console.log("data : ", data.products);

    dispatch({
      type: LANDING_PRODUCT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LANDING_PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// ─── Get single landing product by ID ────────────────────────────────────────
export const listLandingProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: LANDING_PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`${backendurl}/api/products/${id}`);

    dispatch({
      type: LANDING_PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LANDING_PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// ─── Create landing product (admin only) ─────────────────────────────────────
// productData must be a FormData object (contains images + JSON fields)
export const createLandingProduct = (productData) => async (dispatch, getState) => {
  try {
    dispatch({ type: LANDING_PRODUCT_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    if (!userInfo || !userInfo.token) {
      throw new Error('Authentication required');
    }

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        // Do NOT set Content-Type here — axios sets it automatically
        // to multipart/form-data with the correct boundary when body is FormData
      },
      withCredentials: true,
    };

    const { data } = await axios.post(
      `${backendurl}/api/products`,
      productData,
      config
    );

    console.log('Landing product created successfully:', data);

    dispatch({
      type: LANDING_PRODUCT_CREATE_SUCCESS,
      payload: data,
    });

    return data;
  } catch (error) {
    console.error('Landing product creation error:', error);

    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: LANDING_PRODUCT_CREATE_FAIL,
      payload: message,
    });
  }
};

// ─── Update landing product (admin only) ─────────────────────────────────────
// productData can be a FormData object (when updating images) or plain object
export const updateLandingProduct = (id, productData) => async (dispatch, getState) => {
  try {
    dispatch({ type: LANDING_PRODUCT_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const isFormData = productData instanceof FormData;

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      },
      withCredentials: true,
    };

    console.log(`Sending PUT request to: ${backendurl}/api/products/${id}`);

    const { data } = await axios.put(
      `${backendurl}/api/landing-products/${id}`,
      productData,
      config
    );

    console.log('Landing product update successful:', data);

    dispatch({
      type: LANDING_PRODUCT_UPDATE_SUCCESS,
      payload: data,
    });

    return data;
  } catch (error) {
    console.error('Landing product update failed:', error);

    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: LANDING_PRODUCT_UPDATE_FAIL,
      payload: message,
    });
  }
};

// ─── Delete landing product (admin only) ─────────────────────────────────────
export const deleteLandingProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: LANDING_PRODUCT_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`${backendurl}/api/products/${id}`, config);

    dispatch({ type: LANDING_PRODUCT_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: LANDING_PRODUCT_DELETE_FAIL,
      payload: message,
    });
  }
};

// ─── Create review on a landing product ──────────────────────────────────────
export const createLandingProductReview = (productId, review) => async (dispatch, getState) => {
  try {
    dispatch({ type: LANDING_PRODUCT_CREATE_REVIEW_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.post(
      `${backendurl}/api/products/${productId}/reviews`,
      review,
      config
    );

    dispatch({ type: LANDING_PRODUCT_CREATE_REVIEW_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: LANDING_PRODUCT_CREATE_REVIEW_FAIL,
      payload: message,
    });
  }
};
// ─── Aliases for components using non-landing names ───────────────────────────
export const listProductDetails = listLandingProductDetails;
export const createProductReview = createLandingProductReview;