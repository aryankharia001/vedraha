import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listOrders } from '../../actions/orderActions';
import { listUsers } from '../../actions/userActions';
import { Link } from 'react-router-dom';
import Loader from '../Loader';
import Message from '../Message';
import AdminSidebar from './AdminSidebar';
import { listLandingProducts } from '../../actions/productActions';
 
const Dashboard = () => {
  const dispatch = useDispatch();
  
  const orderList = useSelector((state) => state.orderList);
  const { loading: loadingOrders, error: errorOrders, orders } = orderList;
  
  const userList = useSelector((state) => state.userList);
  const { loading: loadingUsers, error: errorUsers, users } = userList;
  
  const productList = useSelector((state) => state.landingProductList);
  const { loading: loadingProducts, error: errorProducts, products } = productList || {};

  const [totalRevenue, setTotalRevenue] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [paidOrders, setPaidOrders] = useState(0);
  const [unpaidOrders, setUnpaidOrders] = useState(0);
  const [deliveredOrders, setDeliveredOrders] = useState(0);
  const [undeliveredOrders, setUndeliveredOrders] = useState(0);
  
  useEffect(() => {
    console.log('Dashboard: Dispatching actions to fetch data');
    dispatch(listLandingProducts({ pageNumber: 1 }));
  }, [dispatch]);
  
  useEffect(() => {
    // Make sure orders is an array before using array methods
    if (orders && Array.isArray(orders)) {
      console.log(`Dashboard: Processing ${orders.length} orders for statistics`);
      
      // Calculate total revenue from paid orders
      const revenue = orders
        .filter(order => order && order.isPaid)
        .reduce((sum, order) => sum + Number(order.totalPrice || 0), 0);
      
      setTotalRevenue(revenue);
      setOrdersCount(orders.length);
      setPaidOrders(orders.filter(order => order && order.isPaid).length);
      setUnpaidOrders(orders.filter(order => order && !order.isPaid).length);
      setDeliveredOrders(orders.filter(order => order && order.isDelivered).length);
      setUndeliveredOrders(orders.filter(order => order && !order.isDelivered).length);
    } else {
      console.log('Dashboard: No orders or invalid order data:', orders);
      
      // Reset values if orders is not a valid array
      setTotalRevenue(0);
      setOrdersCount(0);
      setPaidOrders(0);
      setUnpaidOrders(0);
      setDeliveredOrders(0);
      setUndeliveredOrders(0);
    }
  }, [orders]);
  
  // Make sure to check if orders is an array before using sort
  const recentOrders = orders && Array.isArray(orders) 
    ? [...orders]
      .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
      .slice(0, 5) 
    : [];
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row">
        <AdminSidebar />
        
        <div className="flex-grow md:ml-6">
          <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-[var(--secondary-color-1)] rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <i className="fas fa-chart-line text-[var(--primary-color-1)] text-xl"></i>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Total Revenue</p>
                  <h3 className="text-xl font-bold">₹{totalRevenue.toFixed(2)}</h3>
                </div>
              </div>
            </div>
            
            <div className="bg-[var(--secondary-color-1)] rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="bg-[var(--secondary-color-3)] p-3 rounded-full mr-4">
                  <i className="fas fa-shopping-cart text-[var(--primary-color-2)] text-xl"></i>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Total Orders</p>
                  <h3 className="text-xl font-bold">{ordersCount}</h3>
                </div>
              </div>
            </div>
            
            <div className="bg-[var(--secondary-color-1)] rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="bg-purple-100 p-3 rounded-full mr-4">
                  <i className="fas fa-users text-purple-600 text-xl"></i>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Total Users</p>
                  <h3 className="text-xl font-bold">{users && Array.isArray(users) ? users.length : 0}</h3>
                </div>
              </div>
            </div>
            
            <div className="bg-[var(--secondary-color-1)] rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="bg-yellow-100 p-3 rounded-full mr-4">
                  <i className="fas fa-box text-yellow-600 text-xl"></i>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Total Products</p>
                  <h3 className="text-xl font-bold">
                    {products && Array.isArray(products) ? products.length : 0}
                  </h3>
                </div>
              </div>
            </div>
          </div>
          
          {/* Order Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-[var(--secondary-color-1)] rounded-lg shadow-md p-4">
              <p className="text-sm text-gray-500 mb-1">Paid Orders</p>
              <h3 className="text-xl font-bold text-[var(--primary-color-2)]">{paidOrders}</h3>
            </div>
            
            <div className="bg-[var(--secondary-color-1)] rounded-lg shadow-md p-4">
              <p className="text-sm text-gray-500 mb-1">Unpaid Orders</p>
              <h3 className="text-xl font-bold text-red-600">{unpaidOrders}</h3>
            </div>
            
            <div className="bg-[var(--secondary-color-1)] rounded-lg shadow-md p-4">
              <p className="text-sm text-gray-500 mb-1">Delivered Orders</p>
              <h3 className="text-xl font-bold text-[var(--primary-color-2)]">{deliveredOrders}</h3>
            </div>
            
            <div className="bg-[var(--secondary-color-1)] rounded-lg shadow-md p-4">
              <p className="text-sm text-gray-500 mb-1">Undelivered Orders</p>
              <h3 className="text-xl font-bold text-red-600">{undeliveredOrders}</h3>
            </div>
          </div>
          
          {/* Recent Orders */}
          <div className="bg-[var(--secondary-color-1)] rounded-lg shadow-md overflow-hidden mb-8">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-bold">Recent Orders</h2>
            </div>
            
            <div className="p-4">
              {loadingOrders ? (
                <Loader />
              ) : errorOrders ? (
                <Message variant="danger">{errorOrders}</Message>
              ) : (!Array.isArray(orders) || orders.length === 0) ? (
                <Message>No orders found</Message>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-[var(--secondary-color-1)]">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          ID
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Total
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Paid
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Delivered
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-[var(--secondary-color-1)] divide-y divide-gray-200">
                      {recentOrders.map((order) => (
                        <tr key={order._id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {order._id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            ₹{order.totalPrice || 0}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {order.isPaid ? (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-[var(--secondary-color-3)] text-green-800">
                                {order.paidAt ? new Date(order.paidAt).toLocaleDateString() : 'Paid'}
                              </span>
                            ) : (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                Not Paid
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {order.isDelivered ? (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-[var(--secondary-color-3)] text-green-800">
                                {order.deliveredAt ? new Date(order.deliveredAt).toLocaleDateString() : 'Delivered'}
                              </span>
                            ) : (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                Not Delivered
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <Link
                              to={`/admin/order/${order._id}`}
                              className="text-[var(--primary-color-1)] hover:text-blue-900"
                            >
                              Details
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              <div className="mt-4 text-right">
                <Link
                  to="/admin/order-list"
                  className="text-[var(--primary-color-1)] hover:text-blue-900 font-medium"
                >
                  View All Orders
                </Link>
              </div>
            </div>
          </div>
          
          {/* Recent Products */}
          <div className="bg-[var(--secondary-color-1)] rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-bold">Recent Products</h2>
            </div>
            
            <div className="p-4">
              {loadingProducts ? (
                <Loader />
              ) : errorProducts ? (
                <Message variant="danger">{errorProducts}</Message>
              ) : (!products || !Array.isArray(products) || products.length === 0) ? (
                <Message>No products found</Message>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-[var(--secondary-color-1)]">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Price
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Category
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Stock
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-[var(--secondary-color-1)] divide-y divide-gray-200">
                      {products.slice(0, 5).map((product) => (
                        <tr key={product._id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <img
                                  className="h-10 w-10 rounded-full object-cover"
                                  src={product.image}
                                  alt={product.name}
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = 'https://via.placeholder.com/150';
                                  }}
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {product.name}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            ₹{product.price || 0}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {product.category || 'N/A'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {product.countInStock > 0 ? (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-[var(--secondary-color-3)] text-green-800">
                                In Stock ({product.countInStock})
                              </span>
                            ) : (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                Out of Stock
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <Link
                              to={`/admin/product/update/${product._id}`}
                              className="text-[var(--primary-color-1)] hover:text-blue-900 mr-2"
                            >
                              Edit
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              <div className="mt-4 text-right">
                <Link
                  to="/admin/product-list"
                  className="text-[var(--primary-color-1)] hover:text-blue-900 font-medium"
                >
                  View All Products
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;