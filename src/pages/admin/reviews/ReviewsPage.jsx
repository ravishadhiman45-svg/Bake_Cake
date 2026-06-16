import { useState, useEffect } from 'react';
import { Star, Check, X, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import DataTable from '../../../components/ui/DataTable';
import Badge from '../../../components/ui/Badge';
import ConfirmDialog from '../../../components/ui/ConfirmDialog';
import EmptyState from '../../../components/ui/EmptyState';
import { reviewService } from '../../../services/reviewService';
import { formatDate } from '../../../utils/constants';

const MOCK_REVIEWS = [
  { _id: '1', customer: 'Rahul Sharma', cake: 'Chocolate Truffle', rating: 5, comment: 'Best chocolate cake ever! Absolutely loved it.', status: 'approved', date: '2025-01-15' },
  { _id: '2', customer: 'Priya Patel', cake: 'Red Velvet Dream', rating: 4, comment: 'Great taste, delivery was on time.', status: 'approved', date: '2025-01-14' },
  { _id: '3', customer: 'Amit Kumar', cake: 'Vanilla Bliss', rating: 3, comment: 'Decent cake but could be better.', status: 'pending', date: '2025-01-13' },
  { _id: '4', customer: 'Sneha Reddy', cake: 'Strawberry Fields', rating: 5, comment: 'Perfect for our anniversary! Beautiful design.', status: 'pending', date: '2025-01-12' },
  { _id: '5', customer: 'Vikram Singh', cake: 'Butterscotch Crunch', rating: 2, comment: 'Cake was dry, not what I expected.', status: 'rejected', date: '2025-01-11' },
];

const statusVariant = { approved: 'success', pending: 'warning', rejected: 'error' };

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [actionId, setActionId] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try { const res = await reviewService.getAll(); setReviews(res.data?.reviews || res.data || []); }
      catch { setReviews(MOCK_REVIEWS); }
      finally { setLoading(false); }
    };
    fetch();
  }, []);

  const handleApprove = async (id) => { setActionId(id); try { await reviewService.approve(id); setReviews((prev) => prev.map((r) => (r._id === id ? { ...r, status: 'approved' } : r))); toast.success('Review approved'); } catch { toast.error('Failed to approve review'); } finally { setActionId(null); } };
  const handleReject = async (id) => { setActionId(id); try { await reviewService.reject(id); setReviews((prev) => prev.map((r) => (r._id === id ? { ...r, status: 'rejected' } : r))); toast.success('Review rejected'); } catch { toast.error('Failed to reject review'); } finally { setActionId(null); } };
  const handleDelete = async () => { setDeleting(true); try { await reviewService.delete(deleteId); setReviews((prev) => prev.filter((r) => r._id !== deleteId)); toast.success('Review deleted'); } catch { toast.error('Failed to delete review'); } finally { setDeleting(false); setDeleteId(null); } };

  const columns = [
    { key: 'customer', label: 'Customer', render: (val) => <span className="font-medium text-gray-900 dark:text-white">{val}</span> },
    { key: 'cake', label: 'Cake' },
    { key: 'rating', label: 'Rating', render: (val) => (<div className="flex gap-0.5">{Array.from({ length: 5 }).map((_, i) => (<Star key={i} className={`w-3.5 h-3.5 ${i < val ? 'fill-warning-500 text-warning-500' : 'text-gray-300'}`} />))}</div>) },
    { key: 'comment', label: 'Review', render: (val) => <span className="line-clamp-2 max-w-xs">{val}</span> },
    { key: 'status', label: 'Status', render: (val) => <Badge variant={statusVariant[val]}>{val}</Badge> },
    { key: 'date', label: 'Date', render: (val) => formatDate(val) },
    { key: 'actions', label: 'Actions', sortable: false, render: (_, row) => (<div className="flex items-center gap-1">
      {row.status !== 'approved' && <button onClick={(e) => { e.stopPropagation(); handleApprove(row._id); }} disabled={actionId === row._id} className="p-1.5 rounded-lg hover:bg-success-50 dark:hover:bg-success-500/10 transition-colors"><Check className="w-4 h-4 text-success-500" /></button>}
      {row.status !== 'rejected' && <button onClick={(e) => { e.stopPropagation(); handleReject(row._id); }} disabled={actionId === row._id} className="p-1.5 rounded-lg hover:bg-warning-50 dark:hover:bg-warning-500/10 transition-colors"><X className="w-4 h-4 text-warning-500" /></button>}
      <button onClick={(e) => { e.stopPropagation(); setDeleteId(row._id); }} className="p-1.5 rounded-lg hover:bg-error-50 dark:hover:bg-error-500/10 transition-colors"><Trash2 className="w-4 h-4 text-error-400" /></button>
    </div>) },
  ];

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-gray-900 dark:text-white">Customer Reviews</h1><p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage and moderate customer reviews</p></div>
      {reviews.length === 0 && !loading ? <EmptyState icon={Star} title="No reviews yet" description="Reviews will appear here when customers leave feedback" /> : <DataTable columns={columns} data={reviews} loading={loading} searchKeys={['customer', 'cake']} searchPlaceholder="Search reviews..." exportFilename="reviews" emptyIcon={Star} emptyMessage="No reviews found" />}
      <ConfirmDialog isOpen={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} loading={deleting} title="Delete Review" message="Are you sure you want to delete this review?" />
    </div>
  );
}
