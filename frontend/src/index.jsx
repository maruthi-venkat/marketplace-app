import React from 'react';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import App from './App';
import './styles/App.css';

// Enable better error handling in development
if (process.env.NODE_ENV === 'development') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React, {
    trackAllPureComponents: true,
  });
}

// Create root element
const container = document.getElementById('root');
const root = createRoot(container);

// Render app with strict mode
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Enable hot module replacement in development
if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept();
}

// Handle runtime errors
window.addEventListener('error', (event) => {
  console.error('Runtime error:', event.error);
  // You could send this to an error tracking service
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  // You could send this to an error tracking service
});

// Report web vitals
const reportWebVitals = async () => {
  if (process.env.NODE_ENV === 'production') {
    const { getCLS, getFID, getFCP, getLCP, getTTFB } = await import('web-vitals');
    
    getCLS(console.log);
    getFID(console.log);
    getFCP(console.log);
    getLCP(console.log);
    getTTFB(console.log);
  }
};

reportWebVitals();
