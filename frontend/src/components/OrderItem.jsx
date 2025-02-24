import { Link } from 'react-router-dom';

const OrderItem = ({ order }) => {
  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      processing: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-sm text-gray-500">Order ID:</span>
            <span className="font-medium">{order.id}</span>
            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
              {order.status}
            </span>
          </div>

          <div className="space-y-1">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Date: </span>
              {new Date(order.orderDate).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Quantity: </span>
              {order.quantity}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Total Amount: </span>
              ${order.totalAmount}
            </p>
          </div>
        </div>

        <Link
          to={`/products/${order.productId}`}
          className="text-blue-600 hover:text-blue-800 text-sm"
        >
          View Product
        </Link>
      </div>

      {order.status === 'pending' && (
        <div className="mt-4 flex justify-end space-x-2">
          <button className="px-4 py-2 text-sm text-white bg-green-600 rounded-md hover:bg-green-700">
            Accept
          </button>
          <button className="px-4 py-2 text-sm text-white bg-red-600 rounded-md hover:bg-red-700">
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderItem;
