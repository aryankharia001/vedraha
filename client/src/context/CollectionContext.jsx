import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import { backendurl } from '../App';

// Initial state
const initialState = {
  collections: [],
  loading: false,
  error: null,
};

// Action types
const COLLECTION_LIST_REQUEST = 'COLLECTION_LIST_REQUEST';
const COLLECTION_LIST_SUCCESS = 'COLLECTION_LIST_SUCCESS';
const COLLECTION_LIST_FAIL = 'COLLECTION_LIST_FAIL';

// Reducer
const collectionReducer = (state, action) => {
  switch (action.type) {
    case COLLECTION_LIST_REQUEST:
      return { ...state, loading: true, error: null };
    case COLLECTION_LIST_SUCCESS:
      return { ...state, loading: false, collections: action.payload, error: null };
    case COLLECTION_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

// Create context
const CollectionContext = createContext();

// Provider component
export const CollectionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(collectionReducer, initialState);

  // Fetch all collections
  const getCollections = async () => {
    dispatch({ type: COLLECTION_LIST_REQUEST });
    try {
      const { data } = await axios.get(`${backendurl}/api/ad/collections`);
      dispatch({ type: COLLECTION_LIST_SUCCESS, payload: data.collections || data || [] });
    } catch (error) {
      dispatch({ type: COLLECTION_LIST_FAIL, payload: error.message });
    }
  };

  useEffect(() => {
    getCollections();
  }, []);

  return (
    <CollectionContext.Provider value={{ ...state, getCollections }}>
      {children}
    </CollectionContext.Provider>
  );
};

// Custom hook
export const useCollection = () => {
  const context = useContext(CollectionContext);
  if (!context) {
    throw new Error('useCollection must be used within a CollectionProvider');
  }
  return context;
};