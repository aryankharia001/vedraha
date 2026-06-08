import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  listLandingProducts,
  deleteLandingProduct,
  createLandingProduct,
} from '../../actions/productActions';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import AdminSidebar from '../../components/Admin/AdminSidebar';
import { toast } from 'react-toastify';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { LANDING_PRODUCT_CREATE_RESET } from '../../constants/productConstants';

const ProductListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ Fix: use the actual key names from your combineReducers
  const productList = useSelector((state) => state.landingProductList);
  const { loading, error, products, page, pages } = productList || {};

  const productDelete = useSelector((state) => state.landingProductDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete || {};

  const productCreate = useSelector((state) => state.landingProductCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate || {};

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    dispatch({ type: LANDING_PRODUCT_CREATE_RESET });

    if (!userInfo || !userInfo.isAdmin) {
      navigate('/login');
      return;
    }

    dispatch(listLandingProducts());
  }, [dispatch, navigate, userInfo, successDelete, successCreate]);

  useEffect(() => {
    if (products) {

      console.log("products : ", products);
      setFilteredProducts(
        products.filter((product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [products, searchTerm]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteLandingProduct(id));
      toast.success('Product deleted successfully');
    }
  };

  const createProductHandler = () => {
    navigate('/admin/product/create');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row">
        <AdminSidebar />
        <div className="flex-grow md:ml-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h1 className="text-2xl font-bold mb-4 md:mb-0">Products</h1>
            <button
              className="bg-[var(--hover-button)] hover:bg-[var(--hover-button)] text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200"
              onClick={createProductHandler}
            >
              <i className="fas fa-plus mr-2"></i> Create Product
            </button>
          </div>

          {loadingDelete && <Loader />}
          {errorDelete && <Message variant="danger">{errorDelete}</Message>}
          {loadingCreate && <Loader />}
          {errorCreate && <Message variant="danger">{errorCreate}</Message>}

          <div className="bg-[var(--secondary-color-1)] shadow-md rounded-lg overflow-hidden mb-6">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center">
                <div className="relative flex-grow">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full border rounded py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <i className="fas fa-search"></i>
                  </div>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="p-4"><Loader /></div>
            ) : error ? (
              <div className="p-4"><Message variant="danger">{error}</Message></div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-[var(--secondary-color-1)]">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">VARIANT ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Collection</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Featured</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-[var(--secondary-color-1)] divide-y divide-gray-200">
                    {filteredProducts && filteredProducts.map((product) => (
                      <tr key={product._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product._id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.externalVariantId?.toString?.() || ""}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <img src={product.image} alt={product.name} className="h-10 w-10 rounded-full object-cover" />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{product.price}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product?.category || product?.collections[0].title}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {product.countInStock > 0 ? (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-[var(--secondary-color-3)] text-green-800">
                              {product.countInStock}
                            </span>
                          ) : (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                              Out of Stock
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {product.isFeatured
                            ? <i className="fas fa-check text-[var(--primary-color-2)]"></i>
                            : <i className="fas fa-times text-red-600"></i>}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-3">
                            <Link to={`/admin/product/update/${product._id}`} className="text-[var(--primary-color-1)] hover:text-blue-900 p-1">
                              <FaEdit />
                            </Link>
                            <button onClick={() => deleteHandler(product._id)} className="text-red-600 hover:text-red-900 p-1">
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
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

export default ProductListPage;