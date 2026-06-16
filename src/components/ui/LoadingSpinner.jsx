import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export default function LoadingSpinner({ size = 'md', className = '' }) {
  const sizes = { sm: 'w-4 h-4', md: 'w-8 h-8', lg: 'w-12 h-12' };
  return <div className={`flex items-center justify-center ${className}`}><Loader2 className={`${sizes[size]} animate-spin text-primary-500`} /></div>;
}

export function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-primary-500/10 flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary-500" /></div>
        <p className="text-sm text-gray-500 dark:text-gray-400">Loading...</p>
      </motion.div>
    </div>
  );
}
