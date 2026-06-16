import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Plus, Cake, Eye, Edit2, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import DataTable from '../../../components/ui/DataTable';
import Button from '../../../components/ui/Button';
import Badge from '../../../components/ui/Badge';
import ConfirmDialog from '../../../components/ui/ConfirmDialog';
import EmptyState from '../../../components/ui/EmptyState';
import { cakeService } from '../../../services/cakeService';
import { formatCurrency, CAKE_TYPES } from '../../../utils/constants';

const MOCK_CAKES = [
  { _id: '1', name: 'Chocolate Truffle', price: 2500, flavour: 'Chocolate', weight: '1kg', type: 'Birthday Cakes', isPremium: true, createdAt: '2025-01-10' },
  { _id: '2', name: 'Red Velvet Dream', price: 3200, flavour: 'Red Velvet', weight: '1.5kg', type: 'Anniversary Cakes', isPremium: false, createdAt: '2025-01-09' },
  { _id: '3', name: 'Vanilla Bliss', price: 1800, flavour: 'Vanilla', weight: '1kg', type: 'Occasion Cakes', isPremium: false, createdAt: '2025-01-08' },
  { _id: '4', name: 'Strawberry Fields', price: 2800, flavour: 'Strawberry', weight: '2kg', type: 'Cakes For Her', isPremium: true, createdAt: '2025-01-07' },
  { _id: '5', name: 'Butterscotch Crunch', price: 2100, flavour: 'Butterscotch', weight: '1kg', type: 'Gourmet Cakes', isPremium: false, createdAt: '2025-01-06' },
];

export default function CakesPage() {
  const navigate = useNavigate();
  const [cakes, setCakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [filterType, setFilterType] = useState('');

  useEffect(() => { fetchCakes(); }, []);

  const fetchCakes = async () => {
    try { const res = await cakeService.getAll(filterType ? { type: filterType } : {}); setCakes(res.data?.cakes || res.data || []); }
    catch { setCakes(MOCK_CAKES); }
    finally { setLoading(false); }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try { await cakeService.delete(deleteId); setCakes((prev) => prev.filter((c) => c._id !== deleteId)); toast.success('Cake deleted successfully'); }
    catch { toast.error('Failed to delete cake'); }
    finally { setDeleting(false); setDeleteId(null); }
  };

  const columns = [
    { key: 'name', label: 'Name', render: (val) => <span className="font-medium text-gray-900 dark:text-white">{val}</span> },
    { key: 'type', label: 'Type', render: (val) => <Badge variant="primary">{val}</Badge> },
    { key: 'flavour', label: 'Flavour' },
    { key: 'weight', label: 'Weight' },
    { key: 'price', label: 'Price', render: (val) => formatCurrency(val) },
    { key: 'isPremium', label: 'Premium', render: (val) => <Badge variant={val ? 'warning' : 'default'}>{val ? 'Yes' : 'No'}</Badge> },
    { key: 'actions', label: 'Actions', sortable: false, render: (_, row) => (<div className="flex items-center gap-1">
      <button onClick={(e) => { e.stopPropagation(); navigate(`/admin/cakes/${row._id}`); }} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"><Eye className="w-4 h-4 text-gray-400" /></button>
      <button onClick={(e) => { e.stopPropagation(); navigate(`/admin/cakes/edit/${row._id}`); }} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"><Edit2 className="w-4 h-4 text-blue-400" /></button>
      <button onClick={(e) => { e.stopPropagation(); setDeleteId(row._id); }} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"><Trash2 className="w-4 h-4 text-error-400" /></button>
    </div>) },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div><h1 className="text-2xl font-bold text-gray-900 dark:text-white">Cake Listings</h1><p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your cake catalog</p></div>
        <Link to="/admin/cakes/create"><Button icon={Plus}>Add Cake</Button></Link>
      </div>
      <div className="flex items-center gap-3">
        <select value={filterType} onChange={(e) => { setFilterType(e.target.value); fetchCakes(); }} className="px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700/50 text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500/30">
          <option value="">All Types</option>
          {CAKE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>
      {cakes.length === 0 && !loading ? <EmptyState icon={Cake} title="No cakes yet" description="Add your first cake to start building your catalog" action={<Link to="/admin/cakes/create"><Button icon={Plus}>Add Cake</Button></Link>} /> : <DataTable columns={columns} data={cakes} loading={loading} searchKeys={['name', 'flavour', 'type']} searchPlaceholder="Search cakes..." onRowClick={(row) => navigate(`/admin/cakes/${row._id}`)} exportFilename="cakes" emptyIcon={Cake} emptyMessage="No cakes found" />}
      <ConfirmDialog isOpen={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} loading={deleting} title="Delete Cake" message="Are you sure you want to delete this cake? This action cannot be undone." />
    </div>
  );
}
