import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { adminLogout } from '../../actions/userActions';
import { FaLayerGroup } from 'react-icons/fa';

const AdminSidebar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  
  const logoutHandler = () => {
    dispatch(adminLogout());
  };
  
  const isActive = (path) => {
    return location.pathname === path ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100';
  };
  
  return (
    <div className="w-full md:w-64 mb-6 md:mb-0">
      <div className="bg-[var(--secondary-color-1)] rounded-lg shadow-md overflow-hidden mb-4">
        <div className="px-4 py-3 bg-[var(--hover-button)] text-white">
          <div className="font-bold text-lg">Admin Panel</div>
        </div>
        
        <div className="p-2">
          {userInfo && (
            <div className="p-3 mb-3 border-b">
              <p className="text-gray-900 font-bold">{userInfo.name}</p>
              <p className="text-gray-600 text-sm">{userInfo.email}</p>
            </div>
          )}
          
          <nav className="space-y-1">
            {/* <Link
              to="/admin/dashboard"
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${isActive('/admin/dashboard')}`}
            >
              <i className="fas fa-tachometer-alt mr-3"></i>
              Dashboard
            </Link> */}

            <Link
              to="/admin/collections"
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${isActive('/admin/collections')}`}
            >
              <i className="fas fa-box mr-3"></i>
              Collections
            </Link>

            <Link
              to="/admin/product-list"
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${isActive('/admin/product-list')}`}
            >
              <i className="fas fa-box mr-3"></i>
              Products
            </Link>
            
            {/* <Link
              to="/admin/user-list"
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${isActive('/admin/user-list')}`}
            >
              <i className="fas fa-users mr-3"></i>
              Users
            </Link> */}
            
            {/* <Link
              to="/admin/profile"
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${isActive('/admin/profile')}`}
            >
              <i className="fas fa-user-circle mr-3"></i>
              Profile
            </Link> */}
            
            <button
              onClick={logoutHandler}
              className="w-full flex items-center px-3 py-2 rounded-md text-sm font-medium text-red-700 hover:bg-red-100"
            >
              <i className="fas fa-sign-out-alt mr-3"></i>
              Logout
            </button>
          </nav>
        </div>
      </div>
      
      <div className="bg-[var(--secondary-color-1)] rounded-lg shadow-md overflow-hidden p-4">
        <div className="text-center">
          <Link
            to="/"
            className="text-[var(--primary-color-1)] hover:text-blue-900 text-sm font-medium flex items-center justify-center"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            Back to Store
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;