import { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';

const Select = forwardRef(function Select({ label, error, options, placeholder, className = '', ...props }, ref) {
  return (
    <div className="space-y-1.5">
      {label && <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>}
      <div className="relative">
        <select ref={ref} className={`w-full appearance-none pl-4 pr-10 py-2.5 rounded-xl border ${error ? 'border-error-500 focus:ring-error-500/30' : 'border-gray-200 dark:border-gray-600 focus:ring-primary-500/30 focus:border-primary-500'} bg-white dark:bg-gray-700/50 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 transition ${className}`} {...props}>
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => <option key={opt.value ?? opt} value={opt.value ?? opt}>{opt.label ?? opt}</option>)}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
      </div>
      {error && <p className="text-xs text-error-500">{error}</p>}
    </div>
  );
});

export default Select;
