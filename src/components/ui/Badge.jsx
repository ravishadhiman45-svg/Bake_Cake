export default function Badge({ children, variant = 'default', className = '' }) {
  const variants = {
    default: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
    primary: 'bg-primary-500/10 text-primary-600 dark:text-primary-400',
    success: 'bg-success-50 text-success-600 dark:bg-success-500/10 dark:text-success-500',
    warning: 'bg-warning-50 text-warning-600 dark:bg-warning-500/10 dark:text-warning-500',
    error: 'bg-error-50 text-error-600 dark:bg-error-500/10 dark:text-error-500',
    blue: 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-500',
  };
  return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-medium ${variants[variant]} ${className}`}>{children}</span>;
}
