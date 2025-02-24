import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-white">UniMart</span>
              <span className="ml-2 text-blue-200 text-sm">Marketplace</span>
            </Link>
          </div>

          <div className="flex-1 max-w-xl mx-8">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="search"
                placeholder="Search products..."
                className="w-full px-4 py-2 rounded-full bg-white/10 text-white placeholder-gray-300 
                focus:outline-none focus:ring-2 focus:ring-gray-300 border border-white/20"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>
          </div>

          <div className="flex items-center space-x-4">
            {localStorage.getItem('token') ? (
              <>
                <Link to="/my-products" className="text-blue-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  My Products
                </Link>
                <Link to="/orders" className="text-blue-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Orders
                </Link>
                <Link to="/products/add" className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md text-sm font-medium transition-colors">
                  Add Product
                </Link>
                <button
                  onClick={() => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('userId');
                    window.location.href = '/login';
                  }}
                  className="text-blue-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-blue-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Login
                </Link>
                <Link to="/signup" className="text-blue-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
