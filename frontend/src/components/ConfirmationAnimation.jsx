import { motion } from 'framer-motion';

const ConfirmationAnimation = ({ isVisible }) => (
  <motion.div
    initial={{ scale: 0 }}
    animate={{ scale: isVisible ? 1 : 0 }}
    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
  >
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", duration: 0.5 }}
      className="bg-white rounded-2xl p-8 flex flex-col items-center max-w-sm mx-4"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
        className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-4"
      >
        <svg
          className="w-12 h-12 text-green-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-2xl font-bold text-gray-800 mb-2"
      >
        Order Confirmed!
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-gray-600 text-center mb-6"
      >
        Thank you for your purchase. Your order has been successfully placed.
      </motion.p>
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        onClick={() => window.location.href = '/orders'}
      >
        View Orders
      </motion.button>
    </motion.div>
  </motion.div>
);

export default ConfirmationAnimation; 