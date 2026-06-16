import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Film, Trash2, Upload, Play } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '../../../components/ui/Button';
import FileUpload from '../../../components/ui/FileUpload';
import EmptyState from '../../../components/ui/EmptyState';
import ConfirmDialog from '../../../components/ui/ConfirmDialog';
import { settingsService } from '../../../services/settingsService';

const MOCK_REELS = [
  { _id: '1', title: 'Chocolate Cake Making', url: '', thumbnail: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg', createdAt: '2025-01-15' },
  { _id: '2', title: 'Birthday Special', url: '', thumbnail: 'https://images.pexels.com/photos/172419/pexels-photo-172419.jpeg', createdAt: '2025-01-14' },
  { _id: '3', title: 'Wedding Cake Showcase', url: '', thumbnail: 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg', createdAt: '2025-01-13' },
];

export default function ReelsPage() {
  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try { const res = await settingsService.getReels(); setReels(res.data?.reels || res.data || []); }
      catch { setReels(MOCK_REELS); }
      finally { setLoading(false); }
    };
    fetch();
  }, []);

  const handleUpload = async (files) => {
    if (!files.length) return;
    setUploading(true);
    try { const formData = new FormData(); files.forEach((f) => formData.append('videos', f)); const res = await settingsService.uploadReel(formData); setReels((prev) => [...prev, ...(res.data?.reels || [])]); toast.success('Reels uploaded successfully'); }
    catch { toast.error('Failed to upload reels'); }
    finally { setUploading(false); }
  };

  const handleDelete = async () => { setDeleting(true); try { await settingsService.deleteReel(deleteId); setReels((prev) => prev.filter((r) => r._id !== deleteId)); toast.success('Reel deleted'); } catch { toast.error('Failed to delete reel'); } finally { setDeleting(false); setDeleteId(null); } };

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-gray-900 dark:text-white">Landing Reels</h1><p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage videos that appear on your homepage</p></div>
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700/50"><FileUpload accept="video/*" multiple label="Upload Reels" icon={Upload} onFilesChange={handleUpload} maxFiles={5} preview={false} />{uploading && <div className="mt-4 flex items-center gap-2 text-sm text-primary-500"><div className="w-4 h-4 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />Uploading...</div>}</div>
      {reels.length === 0 && !loading ? <EmptyState icon={Film} title="No reels yet" description="Upload videos to showcase on your homepage" /> : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <AnimatePresence>
            {reels.map((reel) => (
              <motion.div key={reel._id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="group bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700/50 overflow-hidden">
                <div className="relative aspect-9/16 max-h-72 bg-gray-100 dark:bg-gray-700">
                  {reel.thumbnail ? <img src={reel.thumbnail} alt={reel.title} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center"><Film className="w-12 h-12 text-gray-300 dark:text-gray-600" /></div>}
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center"><Play className="w-6 h-6 text-white" /></div></div>
                  <button onClick={() => setDeleteId(reel._id)} className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 className="w-4 h-4" /></button>
                </div>
                <div className="p-3"><p className="text-sm font-medium text-gray-900 dark:text-white truncate">{reel.title}</p><p className="text-xs text-gray-400 mt-0.5">{reel.createdAt}</p></div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
      <ConfirmDialog isOpen={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} loading={deleting} title="Delete Reel" message="Are you sure you want to delete this reel?" />
    </div>
  );
}
