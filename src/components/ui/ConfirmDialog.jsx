import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import Button from './Button';

export default function ConfirmDialog({ isOpen, onClose, onConfirm, title, message, loading }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 max-w-sm w-full">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-error-500/10"><AlertTriangle className="w-6 h-6 text-error-500" /></div>
              <div className="flex-1"><h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3><p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{message}</p></div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline" size="sm" onClick={onClose}>Cancel</Button>
              <Button variant="danger" size="sm" onClick={onConfirm} loading={loading}>Delete</Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
