import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { productsApi } from '../services/api';
import ProductSkeleton from '../components/ProductSkeleton';

const HomePage = ({ showToast }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productsApi.getAllProducts();
        setProducts(data);
      } catch (err) {
        setError(err.message);
        showToast('Failed to load products', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [showToast]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <ProductSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded" role="alert">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50"
    >
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to UniMart</h1>
          <p className="text-lg text-gray-600">Your Universal Marketplace for Everything</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: product.id * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden cursor-pointer flex flex-col"
              onClick={() => navigate(`/products/${product.id}`)}
            >
              {product.image && (
                <div className="relative pt-[100%] overflow-hidden">
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    src={product.image}
                    alt={product.name}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-4 flex flex-col flex-grow">
                <h2 className="text-lg font-semibold mb-2 min-h-[3.5rem] line-clamp-2">{product.name}</h2>
                <p className="text-gray-600 mb-4 flex-grow line-clamp-3">{product.description}</p>
                <div className="mt-auto">
                  <div className="flex justify-between items-center mb-3">
                    <motion.span 
                      whileHover={{ scale: 1.05 }}
                      className="text-xl font-bold text-blue-600"
                    >
                      ${product.price}
                    </motion.span>
                  </div>
                  <Link
                    to={`/products/${product.id}`}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 overflow-hidden"
          onClick={() => setSelectedImage(null)}
        >
          <div className="absolute inset-0 bg-black bg-opacity-75" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <div 
              className="relative max-w-4xl w-full max-h-[90vh] flex items-center justify-center"
              onClick={e => e.stopPropagation()}
            >
              <img 
                src={selectedImage} 
                alt="Full size"
                className="max-w-full max-h-[85vh] object-contain"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-10 right-0 text-white hover:text-gray-300 p-2"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default HomePage;
