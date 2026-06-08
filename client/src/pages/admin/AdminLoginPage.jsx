import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';
import Message from '../../components/Message';

// Using existing action from userActions.js
import { adminLogin } from '../../actions/userActions';
 
const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  
  const redirect = location.search ? location.search.split('=')[1] : '/admin/dashboard';
  
  // useEffect(() => {
  //   // If already logged in and is admin, redirect
  //   if (userInfo && userInfo.isAdmin) {
  //     navigate(redirect);
  //   }
  // }, [navigate, userInfo, redirect]);
  
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(adminLogin(email, password));
  };
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto bg-[var(--secondary-color-1)] rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-[var(--hover-button)] text-white">
          <h2 className="text-xl font-bold">Admin Login</h2>
        </div>
        
        <div className="p-6">
          {error && <Message variant="danger">{error}</Message>}
          {loading && <Loader />}
          
          <form onSubmit={submitHandler}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter admin email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-[var(--hover-button)] hover:bg-[var(--hover-button)] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200"
            >
              Sign In
            </button>
          </form>
          
          <div className="mt-4 text-center">
            <Link to="/" className="text-[var(--primary-color-1)] hover:text-[var(--hover-button)] text-sm">
              Back to Store
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;