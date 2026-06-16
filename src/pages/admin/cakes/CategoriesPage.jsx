import { useState } from 'react';
import { motion } from 'framer-motion';
import { FolderOpen, Plus, Edit2, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Modal from '../../../components/ui/Modal';
import EmptyState from '../../../components/ui/EmptyState';
import { CAKE_TYPES } from '../../../utils/constants';

export default function CategoriesPage() {
  const [categories, setCategories] = useState(CAKE_TYPES.map((name, i) => ({ _id: String(i + 1), name })));
  const [modalOpen, setModalOpen] = useState(false);
  const [editCategory, setEditCategory] = useState(null);
  const [categoryName, setCategoryName] = useState('');

  const handleSave = () => {
    if (!categoryName.trim()) { toast.error('Category name is required'); return; }
    if (editCategory) { setCategories((prev) => prev.map((c) => (c._id === editCategory._id ? { ...c, name: categoryName } : c))); toast.success('Category updated'); }
    else { setCategories((prev) => [...prev, { _id: String(Date.now()), name: categoryName }]); toast.success('Category added'); }
    setModalOpen(false); setCategoryName(''); setEditCategory(null);
  };

  const handleDelete = (id) => { setCategories((prev) => prev.filter((c) => c._id !== id)); toast.success('Category deleted'); };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-gray-900 dark:text-white">Categories</h1><p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage cake categories</p></div>
        <Button icon={Plus} onClick={() => { setEditCategory(null); setCategoryName(''); setModalOpen(true); }}>Add Category</Button>
      </div>
      {categories.length === 0 ? <EmptyState icon={FolderOpen} title="No categories" description="Add your first cake category" /> : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <motion.div key={cat._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} whileHover={{ y: -2 }} className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700/50 group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center"><FolderOpen className="w-5 h-5 text-primary-500" /></div><span className="text-sm font-medium text-gray-900 dark:text-white">{cat.name}</span></div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => { setEditCategory(cat); setCategoryName(cat.name); setModalOpen(true); }} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"><Edit2 className="w-3.5 h-3.5 text-blue-400" /></button>
                  <button onClick={() => handleDelete(cat._id)} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"><Trash2 className="w-3.5 h-3.5 text-error-400" /></button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
      <Modal isOpen={modalOpen} onClose={() => { setModalOpen(false); setCategoryName(''); setEditCategory(null); }} title={editCategory ? 'Edit Category' : 'Add Category'} size="sm">
        <div className="space-y-4">
          <Input label="Category Name" placeholder="Enter category name" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
          <div className="flex justify-end gap-3">
            <Button variant="outline" size="sm" onClick={() => { setModalOpen(false); setCategoryName(''); setEditCategory(null); }}>Cancel</Button>
            <Button size="sm" onClick={handleSave}>{editCategory ? 'Update' : 'Add'}</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
