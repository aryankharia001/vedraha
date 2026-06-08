// actions/orderActions.js
import axios from 'axios';
import { CART_CLEAR_ITEMS } from '../constants/cartConstants';
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_RESET,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
} from '../constants/orderConstants';
import { logout } from './userActions';
import { backendurl } from '../App';

// Action to create a new order
// export const createOrder = (order) => async (dispatch, getState) => {
//   try {
//     dispatch({
//       type: ORDER_CREATE_REQUEST,
//     });

//     const {
//       userLogin: { userInfo },
//     } = getState();

//     const config = {
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${userInfo.token}`,
//       },
//       withCredentials: true,
//     };

//     const { data } = await axios.post(`${backendurl}/api/orders`, order, config);

//     dispatch({
//       type: ORDER_CREATE_SUCCESS,
//       payload: data,
//     });

//     // Clear cart after order is placed
//     dispatch({
//       type: CART_CLEAR_ITEMS,
//     });
//     localStorage.removeItem('cartItems');
//   } catch (error) {
//     const message =
//       error.response && error.response.data.message
//         ? error.response.data.message
//         : error.message;
    
//     if (message === 'Not authorized, token failed') {
//       dispatch(logout());
//     }
    
//     dispatch({
//       type: ORDER_CREATE_FAIL,
//       payload: message,
//     });
//   }
// };

// Updated createOrder action
// export const createOrder = (order) => async (dispatch, getState) => {
//   try {
//     dispatch({
//       type: ORDER_CREATE_REQUEST,
//     });

//     const {
//       userLogin: { userInfo },
//     } = getState();

//     if (!userInfo || !userInfo.token) {
//       throw new Error('User not authenticated');
//     }

//     const config = {
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${userInfo.token}`,
//       },
//       withCredentials: true,
//     };

//     // Debug logs
//     console.log('Creating order with data:', JSON.stringify(order));
    
//     // Make sure cartItems is an array
//     const preparedOrder = {
//       ...order,
//       cartItems: Array.isArray(order.cartItems) ? order.cartItems : [],
//     };

//     // Format data for API - map cartItems to orderItems format
//     const formattedOrder = {
//       ...preparedOrder,
//       orderItems: preparedOrder.cartItems.map(item => ({
//         name: item.name,
//         qty: item.qty,
//         image: item.image,
//         price: typeof item.price === 'number' ? item.price : 0,
//         product: item.product,
//       })),
//     };

//     // Remove cartItems as we now have orderItems
//     delete formattedOrder.cartItems;

//     console.log('Formatted order data:', JSON.stringify(formattedOrder));

//     const { data } = await axios.post(`${backendurl}/api/orders`, formattedOrder, config);

//     console.log('Order created successfully:', data);

//     dispatch({
//       type: ORDER_CREATE_SUCCESS,
//       payload: data,
//     });

//     // Clear cart after order is placed
//     dispatch({
//       type: CART_CLEAR_ITEMS,
//     });
//     localStorage.removeItem('cartItems');
//   } catch (error) {
//     console.error('Order creation error:', error);
    
//     const message =
//       error.response && error.response.data.message
//         ? error.response.data.message
//         : error.message;
    
//     if (message === 'Not authorized, token failed') {
//       dispatch(logout());
//     }
    
//     dispatch({
//       type: ORDER_CREATE_FAIL,
//       payload: message,
//     });
//   }
// };

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    if (!userInfo || !userInfo.token) {
      throw new Error('User not authenticated');
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
      withCredentials: true,
    };

    // Log the order data being sent
    console.log('Sending order data:', JSON.stringify(order));

    const { data } = await axios.post(`${backendurl}/api/orders`, order, config);

    console.log('Order created successfully:', data);

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });

    // Clear cart after order is placed
    dispatch({
      type: CART_CLEAR_ITEMS,
    });
    localStorage.removeItem('cartItems');
  } catch (error) {
    console.error('Order creation error:', error);
    
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload: message,
    });
  }
};

// Action to get order details
export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
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

    const { data } = await axios.get(`${backendurl}/api/orders/${id}`, config);

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: message,
    });
  }
};

// Action to pay for an order (Razorpay integration)
export const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_PAY_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
      withCredentials: true,
    };

    const { data } = await axios.put(
      `${backendurl}/api/orders/${orderId}/pay`,
      paymentResult,
      config
    );

    dispatch({
      type: ORDER_PAY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    
    dispatch({
      type: ORDER_PAY_FAIL,
      payload: message,
    });
  }
};

// Action to mark an order as delivered (admin only)
// export const deliverOrder = (order) => async (dispatch, getState) => {
//   try {
//     dispatch({
//       type: ORDER_DELIVER_REQUEST,
//     });

//     const {
//       userLogin: { userInfo },
//     } = getState();

//     const config = {
//       headers: {
//         Authorization: `Bearer ${userInfo.token}`,
//       },
//       withCredentials: true,
//     };

//     const { data } = await axios.put(
//       `${backendurl}/api/orders/${order._id}/deliver`,
//       {},
//       config
//     );

//     dispatch({
//       type: ORDER_DELIVER_SUCCESS,
//       payload: data,
//     });
//   } catch (error) {
//     const message =
//       error.response && error.response.data.message
//         ? error.response.data.message
//         : error.message;
    
//     if (message === 'Not authorized, token failed') {
//       dispatch(logout());
//     }
    
//     dispatch({
//       type: ORDER_DELIVER_FAIL,
//       payload: message,
//     });
//   }
// };



export const deliverOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DELIVER_REQUEST,
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

    console.log('Marking order as delivered:', order._id);
    
    const { data } = await axios.put(
      `${backendurl}/api/orders/${order._id}/deliver`,
      {},
      config
    );

    console.log('Delivery status updated:', data);

    dispatch({
      type: ORDER_DELIVER_SUCCESS,
      payload: data,
    });
    
    return data; // Return data for promise chaining
  } catch (error) {
    console.error('Error marking order as delivered:', error);
    
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    
    dispatch({
      type: ORDER_DELIVER_FAIL,
      payload: message,
    });
    
    throw error; // Throw the error for promise catching
  }
};

// Action to list logged in user's orders
export const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_MY_REQUEST,
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

    const { data } = await axios.get(`${backendurl}/api/orders/myorders`, config);

    dispatch({
      type: ORDER_LIST_MY_SUCCESS,
      payload: data || [], // Ensure we always have an array
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    
    dispatch({
      type: ORDER_LIST_MY_FAIL,
      payload: message,
    });
  }
};

// Action to list all orders (admin only)
export const listOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    if (!userInfo || !userInfo.token) {
      throw new Error('User not authenticated');
    }

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
      withCredentials: true,
    };

    console.log('Fetching orders with token:', userInfo.token);
    
    // Use the correct API endpoint for admin orders
    const { data } = await axios.get(`${backendurl}/api/orders`, config);
    
    console.log('Orders data received:', data);

    // Handle both array and non-array responses
    const ordersArray = Array.isArray(data) ? data : [];

    dispatch({
      type: ORDER_LIST_SUCCESS,
      payload: ordersArray,
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    
    dispatch({
      type: ORDER_LIST_FAIL,
      payload: message,
    });
  }
};