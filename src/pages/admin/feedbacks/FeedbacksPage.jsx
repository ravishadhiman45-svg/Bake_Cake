import { useState, useEffect } from 'react';
import { MessageSquare, Trash2, Phone, Mail } from 'lucide-react';
import toast from 'react-hot-toast';
import DataTable from '../../../components/ui/DataTable';
import ConfirmDialog from '../../../components/ui/ConfirmDialog';
import EmptyState from '../../../components/ui/EmptyState';
import { feedbackService } from '../../../services/feedbackService';
import { formatDate } from '../../../utils/constants';

const MOCK_FEEDBACKS = [
  { _id: '1', name: 'Anjali Gupta', email: 'anjali@email.com', phone: '9876543210', message: 'Amazing chocolate cake! Will definitely order again. The delivery was super fast.', date: '2025-01-15' },
  { _id: '2', name: 'Rohan Mehta', email: 'rohan@email.com', phone: '9876543211', message: 'Delivery was a bit late but the cake quality was outstanding.', date: '2025-01-14' },
  { _id: '3', name: 'Kavya Nair', email: 'kavya@email.com', phone: '9876543212', message: 'Best red velvet cake in town! Absolutely loved it.', date: '2025-01-13' },
  { _id: '4', name: 'Deepak Joshi', email: 'deepak@email.com', phone: '9876543213', message: 'Would love more variety in flavours. Overall great experience.', date: '2025-01-12' },
  { _id: '5', name: 'Meera Iyer', email: 'meera@email.com', phone: '9876543214', message: 'The custom cake design was exactly what I wanted. Thank you!', date: '2025-01-11' },
];

export default function FeedbacksPage() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try { const res = await feedbackService.getAll(); setFeedbacks(res.data?.feedbacks || res.data || []); }
      catch { setFeedbacks(MOCK_FEEDBACKS); }
      finally { setLoading(false); }
    };
    fetch();
  }, []);

  const handleDelete = async () => { setDeleting(true); try { await feedbackService.delete(deleteId); setFeedbacks((prev) => prev.filter((f) => f._id !== deleteId)); toast.success('Feedback deleted'); } catch { toast.error('Failed to delete feedback'); } finally { setDeleting(false); setDeleteId(null); } };

  const columns = [
    { key: 'name', label: 'Username', render: (val) => <span className="font-medium text-gray-900 dark:text-white">{val}</span> },
    { key: 'email', label: 'Email', render: (val) => <span className="flex items-center gap-1 text-gray-600 dark:text-gray-400"><Mail className="w-3 h-3" />{val}</span> },
    { key: 'phone', label: 'Phone', render: (val) => <span className="flex items-center gap-1 text-gray-600 dark:text-gray-400"><Phone className="w-3 h-3" />{val}</span> },
    { key: 'message', label: 'Feedback', render: (val) => <span className="line-clamp-2 max-w-xs">{val}</span> },
    { key: 'date', label: 'Date', render: (val) => formatDate(val) },
    { key: 'actions', label: 'Actions', sortable: false, render: (_, row) => (<button onClick={(e) => { e.stopPropagation(); setDeleteId(row._id); }} className="p-1.5 rounded-lg hover:bg-error-50 dark:hover:bg-error-500/10 transition-colors"><Trash2 className="w-4 h-4 text-error-400" /></button>) },
  ];

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-gray-900 dark:text-white">User Feedbacks</h1><p className="text-sm text-gray-500 dark:text-gray-400 mt-1">View and manage customer feedback</p></div>
      {feedbacks.length === 0 && !loading ? <EmptyState icon={MessageSquare} title="No feedbacks yet" description="Feedbacks will appear here when customers share their thoughts" /> : <DataTable columns={columns} data={feedbacks} loading={loading} searchKeys={['name', 'email', 'message']} searchPlaceholder="Search feedbacks..." exportFilename="feedbacks" emptyIcon={MessageSquare} emptyMessage="No feedbacks found" />}
      <ConfirmDialog isOpen={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} loading={deleting} title="Delete Feedback" message="Are you sure you want to delete this feedback?" />
    </div>
  );
}
