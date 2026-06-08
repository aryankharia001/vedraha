import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, updateUserProfile } from '../../actions/userActions';
import { USER_UPDATE_PROFILE_RESET } from '../../constants/userConstants';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import AdminSidebar from '../../components/Admin/AdminSidebar';
 
const AdminProfilePage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  // Get user details from Redux store
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  // Get user login info
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // Get update profile state
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  // useEffect(() => {
  //   // Validate admin permissions
  //   if (!userInfo || !userInfo.isAdmin) {
  //     window.location.href = '/admin/login';
  //     return;
  //   }

  //   // Show success message and reset form state
  //   if (success) {
  //     dispatch({ type: USER_UPDATE_PROFILE_RESET });
  //     toast.success('Profile updated successfully');
  //   }

  //   // Fetch user details or populate form with existing data
  //   if (!user || !user.name || success) {
  //     dispatch(getUserDetails('profile'));
  //   } else {
  //     setName(user.name);
  //     setEmail(user.email);
  //   }
  // }, [dispatch, userInfo, user, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    
    // Validate password match
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }
    
    // Clear any previous messages
    setMessage(null);
    
    // Update admin profile
    dispatch(
      updateUserProfile({
        id: user._id,
        name,
        email,
        password,
        isAdmin: true // Ensure admin status is maintained
      })
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row">
        <AdminSidebar />
        
        <div className="flex-grow md:ml-6">
          <h1 className="text-2xl font-bold mb-6">Admin Profile</h1>
          
          <div className="bg-[var(--secondary-color-1)] shadow-md rounded-lg overflow-hidden">
            <div className="p-6">
              {message && <Message variant="danger">{message}</Message>}
              {error && <Message variant="danger">{error}</Message>}
              {success && <Message variant="success">Profile Updated</Message>}
              {loading && <Loader />}
              
              <form onSubmit={submitHandler}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    placeholder="Enter password (leave blank to keep current)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <button
                    type="submit"
                    className="bg-[var(--hover-button)] hover:bg-[var(--hover-button)] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200"
                  >
                    Update Profile
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfilePage;