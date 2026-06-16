import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function StatCard({ title, value, icon: Icon, trend, trendValue, color = 'primary' }) {
  const colors = {
    primary: 'bg-primary-500/10 text-primary-500',
    success: 'bg-success-500/10 text-success-500',
    warning: 'bg-warning-500/10 text-warning-500',
    error: 'bg-error-500/10 text-error-500',
    blue: 'bg-blue-500/10 text-blue-500',
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} whileHover={{ y: -2, boxShadow: '0 8px 30px rgba(0,0,0,0.08)' }} transition={{ duration: 0.3 }} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700/50">
      <div className="flex items-start justify-between">
        <div className={`p-3 rounded-xl ${colors[color]}`}><Icon className="w-5 h-5" /></div>
        {trend && <div className={`flex items-center gap-1 text-xs font-medium ${trend === 'up' ? 'text-success-500' : 'text-error-500'}`}>{trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}{trendValue}</div>}
      </div>
      <div className="mt-4">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{value}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{title}</p>
      </div>
    </motion.div>
  );
}
