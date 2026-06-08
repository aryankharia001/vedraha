import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listUsers } from '../../actions/userActions';
import AdminSidebar from '../../components/Admin/AdminSidebar';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { toast } from 'react-toastify';

const AdminListPage = () => {
  // const dispatch = useDispatch();
  const navigate = useNavigate();
 
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredAdmins, setFilteredAdmins] = useState([]);

  // Use the userList state from Redux store
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // useEffect(() => {
  //   // Verify admin status before fetching data
  //   if (userInfo && userInfo.isAdmin) {
  //     dispatch(listUsers());
  //   } else {
  //     navigate('/admin/login');
  //   }
  // }, [dispatch, navigate, userInfo]);

  useEffect(() => {
    if (users) {
      // Filter only admin users
      const adminUsers = users.filter(user => user.isAdmin);
      
      // Apply search term filter
      setFilteredAdmins(
        adminUsers.filter(
          (admin) =>
            admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            admin.email.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [users, searchTerm]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row">
        <AdminSidebar />
        
        <div className="flex-grow md:ml-6">
          <h1 className="text-2xl font-bold mb-6">Admin Users</h1>
          
          <div className="bg-[var(--secondary-color-1)] shadow-md rounded-lg overflow-hidden mb-8">
            <div className="p-4 border-b border-gray-200">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="relative mb-4 md:mb-0">
                  <input
                    type="text"
                    placeholder="Search admins..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full md:w-64 border rounded py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <i className="fas fa-search bg-[var(--primary-color-2)]"></i>
                  </div>
                </div>
                
                <Link
                  to="/admin/user-list"
                  className="text-[var(--primary-color-1)] hover:text-[var(--hover-button)]"
                >
                  <i className="fas fa-users mr-2"></i>
                  View All Users
                </Link>
              </div>
            </div>
            
            {loading ? (
              <div className="p-4">
                <Loader />
              </div>
            ) : error ? (
              <div className="p-4">
                <Message variant="danger">{error}</Message>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-[var(--secondary-color-1)]">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Registered
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-[var(--secondary-color-1)] divide-y divide-gray-200">
                    {filteredAdmins.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="px-6 py-4 text-center">
                          No admin users found
                        </td>
                      </tr>
                    ) : (
                      filteredAdmins.map((admin) => (
                        <tr key={admin._id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {admin._id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {admin.name}
                              {admin._id === userInfo._id && (
                                <span className="ml-2 text-xs text-[var(--primary-color-1)]">(You)</span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <a href={`mailto:${admin.email}`} className="text-sm text-[var(--primary-color-1)] hover:underline">
                              {admin.email}
                            </a>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                              Administrator
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(admin.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <Link
                              to={`/admin/user/update/${admin._id}`}
                              className="text-[var(--primary-color-1)] hover:text-blue-900"
                            >
                              <i className="fas fa-edit"></i>
                            </Link>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminListPage;