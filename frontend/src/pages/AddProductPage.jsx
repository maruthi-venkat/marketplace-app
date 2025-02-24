import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { myProductsApi } from '../services/api';
import FormInput from '../components/FormInput';

const AddProductPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? value.replace(/[^0-9.]/g, '') : value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }
    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Please enter a valid price';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (!formData.image.trim()) {
      newErrors.image = 'Image URL is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      const productData = {
        ...formData,
        price: parseFloat(formData.price)
      };
      await myProductsApi.create(productData);
      navigate('/my-products');
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-6">Add New Product</h1>

          {errors.submit && (
            <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {errors.submit}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <FormInput
              label="Product Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              placeholder="Enter product name"
            />

            <FormInput
              label="Price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              error={errors.price}
              placeholder="Enter price"
              step="0.01"
              min="0"
            />

            <FormInput
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              error={errors.description}
              placeholder="Enter product description"
            />

            <FormInput
              label="Image URL"
              name="image"
              value={formData.image}
              onChange={handleChange}
              error={errors.image}
              placeholder="Enter image URL"
            />

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors
                ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Adding Product...' : 'Add Product'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;
