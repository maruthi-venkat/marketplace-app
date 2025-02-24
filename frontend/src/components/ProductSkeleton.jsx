import { motion } from 'framer-motion';

const ProductSkeleton = () => (
  <div className="bg-white rounded-xl shadow-sm p-4 h-full">
    <div className="animate-pulse">
      <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <div className="h-6 bg-gray-200 rounded w-20"></div>
        <div className="h-8 bg-gray-200 rounded w-28"></div>
      </div>
    </div>
  </div>
);

export default ProductSkeleton; 