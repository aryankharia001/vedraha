import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  listCollections,
  createCollection,
  updateCollection,
  deleteCollection
} from '../../actions/collectionActions';
import { COLLECTION_CREATE_RESET, COLLECTION_UPDATE_RESET } from '../../constants/collectionConstants';
import AdminSidebar from '../../components/Admin/AdminSidebar';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { FaEdit, FaTrash, FaPlus, FaImage } from 'react-icons/fa';
 
const CollectionManagementPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Form states
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingCollection, setEditingCollection] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    body_html: '',
    isActive: true,
    sortOrder: 0,
    seo: {
      metaTitle: '',
      metaDescription: '',
      keywords: ''
    }
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [uploading, setUploading] = useState(false);

  // Redux state
  const collectionList = useSelector((state) => state.collectionList);
  const { loading, error, collections = [] } = collectionList;
  

  const collectionCreate = useSelector((state) => state.collectionCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    collection: createdCollection
  } = collectionCreate;

  const collectionUpdate = useSelector((state) => state.collectionUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate
  } = collectionUpdate;

  const collectionDelete = useSelector((state) => state.collectionDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete
  } = collectionDelete;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // Load collections on component mount
  // useEffect(() => {
  //   if (!userInfo || !userInfo.isAdmin) {
  //     navigate('/login');
  //     return;
  //   }
  //   dispatch(listCollections());
  // }, [dispatch, navigate, userInfo]);

  // Handle successful operations
  useEffect(() => {
    if (successCreate) {
      toast.success('Collection created successfully');
      dispatch({ type: COLLECTION_CREATE_RESET });
      resetForm();
      dispatch(listCollections());
    }
  }, [dispatch, successCreate]);

  useEffect(() => {
    if (successUpdate) {
      toast.success('Collection updated successfully');
      dispatch({ type: COLLECTION_UPDATE_RESET });
      resetForm();
      dispatch(listCollections());
    }
  }, [dispatch, successUpdate]);

  useEffect(() => {
    if (successDelete) {
      toast.success('Collection deleted successfully');
      dispatch(listCollections());
    }
  }, [dispatch, successDelete]);

  const resetForm = () => {
    setFormData({
      title: '',
      body_html: '',
      isActive: true,
      sortOrder: 0,
      seo: {
        metaTitle: '',
        metaDescription: '',
        keywords: ''
      }
    });
    setImage(null);
    setImagePreview('');
    setShowCreateForm(false);
    setEditingCollection(null);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please select a valid image file');
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }

      setImage(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      toast.error('Collection title is required');
      return;
    }

    setUploading(true);

    try {
      const formDataToSend = new FormData();
      
      formDataToSend.append('title', formData.title);
      formDataToSend.append('body_html', formData.body_html || `<p>${formData.title} collection</p>`);
      formDataToSend.append('isActive', formData.isActive);
      formDataToSend.append('sortOrder', formData.sortOrder);
      
      const seoData = {
        ...formData.seo,
        keywords: formData.seo.keywords.split(',').map(k => k.trim()).filter(k => k)
      };
      formDataToSend.append('seo', JSON.stringify(seoData));
      
      if (image) {
        formDataToSend.append('image', image, image.name);
      }

      if (editingCollection) {
        formDataToSend.append('_id', editingCollection._id);
        dispatch(updateCollection(editingCollection._id, formDataToSend));
      } else {
        dispatch(createCollection(formDataToSend));
      }

    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to save collection');
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (collection) => {
    setEditingCollection(collection);
    setFormData({
      title: collection.title,
      body_html: collection.body_html || '',
      isActive: collection.isActive,
      sortOrder: collection.sortOrder || 0,
      seo: {
        metaTitle: collection.seo?.metaTitle || '',
        metaDescription: collection.seo?.metaDescription || '',
        keywords: collection.seo?.keywords?.join(', ') || ''
      }
    });
    
    if (collection.image?.url || collection.imageUrl) {
      setImagePreview(collection.image?.url || collection.imageUrl);
    }
    
    setShowCreateForm(true);
  };

  const handleDelete = (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
      dispatch(deleteCollection(id));
    }
  };


  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row">
        <AdminSidebar />
        
        <div className="flex-grow md:ml-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h1 className="text-2xl font-bold mb-4 md:mb-0">Collection Management</h1>
            <button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="bg-[var(--hover-button)] hover:bg-[var(--hover-button)] text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200 flex items-center"
            >
              <FaPlus className="mr-2" />
              {showCreateForm ? 'Cancel' : 'Create Collection'}
            </button>
          </div>

          {/* Show any errors */}
          {(errorCreate || errorUpdate || errorDelete) && (
            <Message variant="danger">
              {errorCreate || errorUpdate || errorDelete}
            </Message>
          )}

          {/* Create/Edit Form */}
          {showCreateForm && (
            <div className="bg-[var(--secondary-color-1)] shadow-md rounded-lg p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">
                {editingCollection ? 'Edit Collection' : 'Create New Collection'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Collection Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                      disabled={uploading}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Sort Order
                    </label>
                    <input
                      type="number"
                      name="sortOrder"
                      value={formData.sortOrder}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={uploading}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Description
                  </label>
                  <textarea
                    name="body_html"
                    value={formData.body_html}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Collection description..."
                    disabled={uploading}
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Collection Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={uploading}
                  />
                  
                  {imagePreview && (
                    <div className="mt-4">
                      <img 
                        src={imagePreview} 
                        alt="Collection preview" 
                        className="w-32 h-32 object-cover rounded border border-gray-300"
                      />
                    </div>
                  )}
                </div>

                {/* SEO Section */}
                <div className="border-t pt-4">
                  <h3 className="text-lg font-medium text-gray-800 mb-3">SEO Settings</h3>
                  <div className="space-y-4">
                    <input
                      type="text"
                      name="seo.metaTitle"
                      value={formData.seo.metaTitle}
                      onChange={handleInputChange}
                      placeholder="Meta Title"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={uploading}
                    />
                    <textarea
                      name="seo.metaDescription"
                      value={formData.seo.metaDescription}
                      onChange={handleInputChange}
                      placeholder="Meta Description"
                      rows="2"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={uploading}
                    />
                    <input
                      type="text"
                      name="seo.keywords"
                      value={formData.seo.keywords}
                      onChange={handleInputChange}
                      placeholder="Keywords (comma separated)"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={uploading}
                    />
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    disabled={uploading}
                  />
                  <label className="ml-2 block text-gray-700">
                    Active Collection
                  </label>
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={uploading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={uploading || loadingCreate || loadingUpdate}
                    className="px-4 py-2 bg-[var(--hover-button)] text-white rounded-md hover:bg-[var(--hover-button)] focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                  >
                    {uploading ? 'Saving...' : (editingCollection ? 'Update Collection' : 'Create Collection')}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Collections List */}
          <div className="bg-[var(--secondary-color-1)] shadow-md rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">Existing Collections</h2>
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
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Image
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Sort Order
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Created
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>


                  <tbody className="bg-[var(--secondary-color-1)] divide-y divide-gray-200">
                    {collections?.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                          No collections found. Create your first collection!
                        </td>
                      </tr>
                    ) : (Array.isArray(collections) &&
                      collections?.map((collection) => (
                        <tr key={collection._id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {collection.image?.url || collection.imageUrl ? (
                              <img
                                src={collection.image?.url || collection.imageUrl}
                                alt={collection.title}
                                className="h-10 w-10 rounded object-cover"
                              />
                            ) : (
                              <div className="h-10 w-10 bg-gray-200 rounded flex items-center justify-center">
                                <FaImage className="text-gray-400" />
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {collection.title}
                            </div>
                            <div className="text-sm text-gray-500">
                              {collection.handle}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              collection.isActive 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {collection.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {collection.sortOrder || 0}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(collection.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center space-x-3">
                              <button
                                onClick={() => handleEdit(collection)}
                                className="text-[var(--primary-color-1)] hover:text-blue-900 p-1"
                                disabled={loadingDelete}
                              >
                                <FaEdit />
                              </button>
                              <button
                                onClick={() => handleDelete(collection._id, collection.title)}
                                className="text-red-600 hover:text-red-900 p-1"
                                disabled={loadingDelete}
                              >
                                <FaTrash />
                              </button>
                            </div>
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

export default CollectionManagementPage;