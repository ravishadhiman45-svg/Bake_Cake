import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export default function Button({ children, variant = 'primary', size = 'md', loading = false, icon: Icon, className = '', ...props }) {
  const variants = {
    primary: 'bg-primary-500 hover:bg-primary-600 text-white shadow-sm shadow-primary-500/25',
    secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200',
    outline: 'border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300',
    danger: 'bg-error-500 hover:bg-error-600 text-white shadow-sm shadow-error-500/25',
    ghost: 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400',
  };
  const sizes = { sm: 'px-3 py-1.5 text-xs gap-1.5', md: 'px-4 py-2 text-sm gap-2', lg: 'px-6 py-2.5 text-base gap-2' };
  return (
    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className={`inline-flex items-center justify-center font-medium rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`} disabled={loading || props.disabled} {...props}>
      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : Icon && <Icon className="w-4 h-4" />}
      {children}
    </motion.button>
  );
}
