import { Link } from 'react-router-dom';

const ProductCard = ({ product, onDelete }) => {
  const handleDelete = (e) => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to delete this product?')) {
      onDelete(product.id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {product.image && (
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-blue-600">
            ${product.price}
          </span>
          <div className="flex space-x-2">
            <Link 
              to={`/my-products/edit/${product.id}`} 
              className="text-gray-600 hover:text-blue-600"
            >
              Edit
            </Link>
            <button
              onClick={handleDelete}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
