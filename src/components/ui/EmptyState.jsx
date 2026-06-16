import { motion } from 'framer-motion';

export default function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center justify-center py-16 px-4">
      {Icon && <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-700/50 flex items-center justify-center mb-4"><Icon className="w-8 h-8 text-gray-400 dark:text-gray-500" /></div>}
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-sm mb-4">{description}</p>
      {action}
    </motion.div>
  );
}
