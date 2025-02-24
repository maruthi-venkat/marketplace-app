import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productsApi } from '../services/api';
import ordersApi from '../services/ordersApi';
import ConfirmationAnimation from '../components/ConfirmationAnimation';

const OrderPage = ({ showToast }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      setError(null);

      const totalAmount = product.price * quantity;

      const orderData = {
        productId: id,
        customerId: "user123",
        quantity: parseInt(quantity),
        productName: product.name,
        totalAmount: totalAmount
      };

      console.log('Sending order data:', orderData);

      await ordersApi.create(orderData);
      showToast('Order placed successfully!', 'success');
      setOrderPlaced(true);
    } catch (err) {
      console.error('Order creation error:', err);
      setError(err.message);
      showToast('Failed to place order. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

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

  if (!product) return null;

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6">Place Order</h1>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-2">{product.description}</p>
            <p className="text-lg font-bold text-blue-600">Price: ${product.price}</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <input
                type="number"
                id="quantity"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-between items-center">
              <p className="text-lg font-bold">
                Total: ${(product.price * quantity).toFixed(2)}
              </p>
              <div className="space-x-4">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 ${
                    submitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {submitting ? 'Placing Order...' : 'Place Order'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {orderPlaced && <ConfirmationAnimation isVisible={true} />}
    </div>
  );
};

export default OrderPage; 