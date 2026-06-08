import React, { createContext, useContext, useReducer } from 'react';
import axios from 'axios';
import { backendurl } from '../App';

// Initial state
const initialState = {
  products: [],
  loading: false,
  error: null,
  total: 0,
  page: 1,
  pages: 1,
  success: false,
  createLoading: false,
  createError: null,
  createSuccess: false,
  createProduct: null,
  updateLoading: false,
  updateError: null,
  updateSuccess: false,
  deleteLoading: false,
  deleteError: null,
  deleteSuccess: false,
};

// Action types
const PRODUCT_LIST_REQUEST = 'PRODUCT_LIST_REQUEST';
const PRODUCT_LIST_SUCCESS = 'PRODUCT_LIST_SUCCESS';
const PRODUCT_LIST_FAIL = 'PRODUCT_LIST_FAIL';
const PRODUCT_CREATE_REQUEST = 'PRODUCT_CREATE_REQUEST';
const PRODUCT_CREATE_SUCCESS = 'PRODUCT_CREATE_SUCCESS';
const PRODUCT_CREATE_FAIL = 'PRODUCT_CREATE_FAIL';
const PRODUCT_UPDATE_REQUEST = 'PRODUCT_UPDATE_REQUEST';
const PRODUCT_UPDATE_SUCCESS = 'PRODUCT_UPDATE_SUCCESS';
const PRODUCT_UPDATE_FAIL = 'PRODUCT_UPDATE_FAIL';
const PRODUCT_DELETE_REQUEST = 'PRODUCT_DELETE_REQUEST';
const PRODUCT_DELETE_SUCCESS = 'PRODUCT_DELETE_SUCCESS';
const PRODUCT_DELETE_FAIL = 'PRODUCT_DELETE_FAIL';
const PRODUCT_RESET = 'PRODUCT_RESET';

// Get auth config
const getAuthConfig = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
  return {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${userInfo.token}`,
    },
  };
};

// Reducer
const productReducer = (state, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { ...state, loading: true, error: null };
    case PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload.products || action.payload || [],
        total: action.payload.total,
        page: action.payload.page,
        pages: action.payload.pages,
        error: null,
      };
    case PRODUCT_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };

    case PRODUCT_CREATE_REQUEST:
      return { ...state, createLoading: true, createError: null };
    case PRODUCT_CREATE_SUCCESS:
      return {
        ...state,
        createLoading: false,
        createSuccess: true,
        createError: null,
        createProduct: action.payload,
        products: [...state.products, action.payload],
      };
    case PRODUCT_CREATE_FAIL:
      return { ...state, createLoading: false, createSuccess: false, createError: action.payload };

    case PRODUCT_UPDATE_REQUEST:
      return { ...state, updateLoading: true, updateError: null };
    case PRODUCT_UPDATE_SUCCESS:
      return {
        ...state,
        updateLoading: false,
        updateSuccess: true,
        updateError: null,
        products: state.products.map(product =>
          product._id === action.payload._id ? action.payload : product
        ),
      };
    case PRODUCT_UPDATE_FAIL:
      return { ...state, updateLoading: false, updateSuccess: false, updateError: action.payload };

    case PRODUCT_DELETE_REQUEST:
      return { ...state, deleteLoading: true, deleteError: null };
    case PRODUCT_DELETE_SUCCESS:
      return {
        ...state,
        deleteLoading: false,
        deleteSuccess: true,
        deleteError: null,
        products: state.products.filter(product => product._id !== action.payload),
      };
    case PRODUCT_DELETE_FAIL:
      return { ...state, deleteLoading: false, deleteSuccess: false, deleteError: action.payload };

    case PRODUCT_RESET:
      return {
        ...initialState,
        products: state.products,
      };

    default:
      return state;
  }
};

// Create context
const ProductContext = createContext();

// Provider component
export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  // Reset actions
  const resetProductState = () => dispatch({ type: PRODUCT_RESET });

  // Fetch all products
  const getProducts = async (keyword = '', category = '') => {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    try {
      const config = {
        params: { keyword, category }
      };
      const { data } = await axios.get(`${backendurl}/api/products`, config);
      dispatch({
        type: PRODUCT_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({ type: PRODUCT_LIST_FAIL, payload: error.response?.data?.message || error.message });
    }
  };

  // Create product
  const createProduct = async (formData) => {
    dispatch({ type: PRODUCT_CREATE_REQUEST });
    try {
      const { data } = await axios.post(`${backendurl}/api/products`, formData, getAuthConfig());
      dispatch({
        type: PRODUCT_CREATE_SUCCESS,
        payload: data.product,
      });
      return data.product;
    } catch (error) {
      dispatch({ type: PRODUCT_CREATE_FAIL, payload: error.response?.data?.message || error.message });
      throw error;
    }
  };

  // Update product
  const updateProduct = async (id, formData) => {
    dispatch({ type: PRODUCT_UPDATE_REQUEST });
    try {
      const { data } = await axios.put(`${backendurl}/api/products/${id}`, formData, getAuthConfig());
      dispatch({
        type: PRODUCT_UPDATE_SUCCESS,
        payload: data.product,
      });
      return data.product;
    } catch (error) {
      dispatch({ type: PRODUCT_UPDATE_FAIL, payload: error.response?.data?.message || error.message });
      throw error;
    }
  };

  // Delete product
  const deleteProduct = async (id) => {
    dispatch({ type: PRODUCT_DELETE_REQUEST });
    try {
      await axios.delete(`${backendurl}/api/products/${id}`, getAuthConfig());
      dispatch({
        type: PRODUCT_DELETE_SUCCESS,
        payload: id,
      });
      return true;
    } catch (error) {
      dispatch({ type: PRODUCT_DELETE_FAIL, payload: error.response?.data?.message || error.message });
      throw error;
    }
  };

  // Get product by ID
  const getProductById = async (id) => {
    try {
      const { data } = await axios.get(`${backendurl}/api/products/${id}`);
      return data.product || data;
    } catch (error) {
      throw error;
    }
  };

  return (
    <ProductContext.Provider value={{
      ...state,
      getProducts,
      createProduct,
      updateProduct,
      deleteProduct,
      getProductById,
      resetProductState,
    }}>
      {children}
    </ProductContext.Provider>
  );
};

// Custom hook
export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProduct must be used within a ProductProvider');
  }
  return context;
};