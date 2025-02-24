import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AddProductPage from './pages/AddProductPage';
import EditProductPage from './pages/EditProductPage';
import ProductDetailPage from './pages/ProductDetailPage';
import OrdersPage from './pages/OrdersPage';
import MyProductsPage from './pages/MyProductsPage';
import EditMyProductPage from './pages/EditMyProductPage';
import SearchResultsPage from './pages/SearchResultsPage';
import OrderPage from './pages/OrderPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './components/PrivateRoute';
import './styles/App.css';

// Toast Notification Component
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`toast toast-${type}`}>
      {message}
    </div>
  );
};

// Loading Spinner Component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Oops! Something went wrong</h2>
            <p className="text-gray-600 mb-4">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  return (
    <ErrorBoundary>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          
          <main className="container mx-auto px-4 py-8">
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/login" element={<LoginPage showToast={showToast} />} />
                <Route path="/signup" element={<SignupPage showToast={showToast} />} />
                <Route path="/" element={<HomePage showToast={showToast} />} />
                {/* Protected Routes */}
                <Route path="/my-products" element={<PrivateRoute><MyProductsPage showToast={showToast} /></PrivateRoute>} />
                <Route path="/products/add" element={<PrivateRoute><AddProductPage showToast={showToast} /></PrivateRoute>} />
                <Route path="/products/edit/:id" element={<PrivateRoute><EditProductPage showToast={showToast} /></PrivateRoute>} />
                <Route path="/products/:id" element={<PrivateRoute><ProductDetailPage showToast={showToast} /></PrivateRoute>} />
                <Route path="/orders" element={<PrivateRoute><OrdersPage showToast={showToast} /></PrivateRoute>} />
                <Route path="/orders/new/:id" element={<PrivateRoute><OrderPage showToast={showToast} /></PrivateRoute>} />
                <Route path="/search" element={<PrivateRoute><SearchResultsPage showToast={showToast} /></PrivateRoute>} />
                <Route 
                  path="*" 
                  element={
                    <div className="text-center py-12">
                      <h2 className="text-2xl font-bold text-gray-900">Page Not Found</h2>
                      <p className="mt-2 text-gray-600">The page you're looking for doesn't exist.</p>
                    </div>
                  } 
                />
              </Routes>
            </Suspense>
          </main>

          {toast && (
            <Toast
              message={toast.message}
              type={toast.type}
              onClose={() => setToast(null)}
            />
          )}
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
