import { motion, AnimatePresence } from 'framer-motion';

const FormInput = ({ 
  label, 
  error, 
  type = "text", 
  ...props 
}) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <input
        type={type}
        className={`
          shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
          focus:outline-none focus:shadow-outline
          ${error ? 'border-red-500' : 'border-gray-300'}
        `}
        {...props}
      />
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-red-500 text-xs italic mt-1"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FormInput; 