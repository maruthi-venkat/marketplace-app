import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ordersApi from '../services/ordersApi';

const OrdersPage = () => {
  const [placedOrders, setPlacedOrders] = useState([]);
  const [receivedOrders, setReceivedOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const userId = localStorage.getItem('userId');
        console.log('Fetching orders for userId:', userId);
        
        const [placedData, receivedData] = await Promise.all([
          ordersApi.getByBuyerId(userId),
          ordersApi.getBySellerId(userId)
        ]);

        console.log('Raw API responses:', { placedData, receivedData });
        
        // Set the orders directly from the API response
        setPlacedOrders(placedData || []);
        setReceivedOrders(receivedData || []);
        
      } catch (err) {
        console.error('Error loading orders:', err);
        setError(err.message);
        if (err.message.includes('Authentication')) {
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, [navigate]);

  const getStatusBadgeClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const OrdersTable = ({ orders, title }) => (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      {orders.length === 0 ? (
        <div className="text-center py-4 bg-white rounded-lg shadow">
          <p className="text-gray-500">No orders found</p>
        </div>
      ) : (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {order.productName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{order.quantity}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      ${order.totalAmount?.toFixed(2)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(order.orderDate).toLocaleDateString()}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

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
        <div className="max-w-4xl mx-auto bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">My Orders</h1>
        
        <div className="space-y-8">
          <OrdersTable 
            orders={placedOrders} 
            title={`Orders Placed (${placedOrders.length})`} 
          />
          <OrdersTable 
            orders={receivedOrders} 
            title={`Orders Received (${receivedOrders.length})`} 
          />
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
