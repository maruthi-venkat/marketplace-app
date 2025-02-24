import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productsApi } from '../services/api';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const data = await productsApi.getById(id);
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen p-4">
        <div className="max-w-2xl mx-auto bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen p-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold">Product not found</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            {product.image && (
              <img
                src={product.image}
                alt={product.name}
                className="h-48 w-full object-cover md:h-full md:w-96"
              />
            )}
          </div>
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <div className="flex items-center justify-between mb-6">
              <span className="text-2xl font-bold text-blue-600">
                ${product.price}
              </span>
            </div>
            <button
              onClick={() => navigate(`/orders/new/${product.id}`)}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Order Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
