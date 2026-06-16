import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Eye, ChevronDown } from 'lucide-react';
import toast from 'react-hot-toast';
import DataTable from '../../../components/ui/DataTable';
import Badge from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';
import EmptyState from '../../../components/ui/EmptyState';
import { orderService } from '../../../services/orderService';
import { formatCurrency, formatDate, ORDER_STATUSES } from '../../../utils/constants';

const MOCK_ORDERS = [
  { _id: 'ORD001', customer: { name: 'Rahul Sharma', email: 'rahul@email.com', phone: '9876543210' }, address: '123 Main St, Mumbai', products: [{ name: 'Chocolate Cake', qty: 1, price: 2500 }], totalAmount: 2500, status: 'Delivered', paymentStatus: 'Paid', createdAt: '2025-01-15' },
  { _id: 'ORD002', customer: { name: 'Priya Patel', email: 'priya@email.com', phone: '9876543211' }, address: '456 Park Ave, Delhi', products: [{ name: 'Red Velvet Cake', qty: 1, price: 3200 }, { name: 'Cupcakes', qty: 6, price: 600 }], totalAmount: 3800, status: 'Preparing', paymentStatus: 'Paid', createdAt: '2025-01-14' },
  { _id: 'ORD003', customer: { name: 'Amit Kumar', email: 'amit@email.com', phone: '9876543212' }, address: '789 Lake Rd, Bangalore', products: [{ name: 'Vanilla Cake', qty: 1, price: 1800 }], totalAmount: 1800, status: 'Pending', paymentStatus: 'Unpaid', createdAt: '2025-01-14' },
  { _id: 'ORD004', customer: { name: 'Sneha Reddy', email: 'sneha@email.com', phone: '9876543213' }, address: '321 Hill View, Hyderabad', products: [{ name: 'Strawberry Cake', qty: 1, price: 4500 }], totalAmount: 4500, status: 'Out For Delivery', paymentStatus: 'Paid', createdAt: '2025-01-13' },
  { _id: 'ORD005', customer: { name: 'Vikram Singh', email: 'vikram@email.com', phone: '9876543214' }, address: '654 River Ln, Chennai', products: [{ name: 'Butterscotch Cake', qty: 1, price: 2100 }], totalAmount: 2100, status: 'Confirmed', paymentStatus: 'Paid', createdAt: '2025-01-13' },
];

const statusVariant = { Pending: 'warning', Confirmed: 'blue', Preparing: 'primary', 'Out For Delivery': 'warning', Delivered: 'success', Cancelled: 'error' };
const paymentVariant = { Paid: 'success', Unpaid: 'warning', Refunded: 'default' };

export default function OrdersPage() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => { fetchOrders(); }, []);

  const fetchOrders = async () => {
    try { const res = await orderService.getAll(statusFilter ? { status: statusFilter } : {}); setOrders(res.data?.orders || res.data || []); }
    catch { setOrders(MOCK_ORDERS); }
    finally { setLoading(false); }
  };

  const updateStatus = async (id, status) => {
    setUpdatingId(id);
    try { await orderService.updateStatus(id, status); setOrders((prev) => prev.map((o) => (o._id === id ? { ...o, status } : o))); toast.success(`Order status updated to ${status}`); }
    catch { toast.error('Failed to update status'); }
    finally { setUpdatingId(null); }
  };

  const columns = [
    { key: '_id', label: 'Order ID', render: (val) => <span className="font-mono text-xs">{val}</span> },
    { key: 'customer', label: 'Customer', render: (val) => (<div><p className="font-medium text-gray-900 dark:text-white">{val?.name || val}</p><p className="text-xs text-gray-400">{val?.email}</p></div>) },
    { key: 'totalAmount', label: 'Amount', render: (val) => formatCurrency(val) },
    { key: 'status', label: 'Status', render: (val) => <Badge variant={statusVariant[val]}>{val}</Badge> },
    { key: 'paymentStatus', label: 'Payment', render: (val) => <Badge variant={paymentVariant[val]}>{val}</Badge> },
    { key: 'createdAt', label: 'Date', render: (val) => formatDate(val) },
    { key: 'actions', label: 'Actions', sortable: false, render: (_, row) => (<div className="flex items-center gap-1">
      <button onClick={(e) => { e.stopPropagation(); navigate(`/admin/orders/${row._id}`); }} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"><Eye className="w-4 h-4 text-gray-400" /></button>
      <div className="relative group">
        <button className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"><ChevronDown className="w-4 h-4 text-gray-400" /></button>
        <div className="absolute right-0 mt-1 w-44 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 py-1 z-10 hidden group-hover:block">
          {ORDER_STATUSES.filter((s) => s !== row.status).map((s) => (<button key={s} onClick={(e) => { e.stopPropagation(); updateStatus(row._id, s); }} disabled={updatingId === row._id} className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">Mark as {s}</button>))}
        </div>
      </div>
    </div>) },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div><h1 className="text-2xl font-bold text-gray-900 dark:text-white">Orders</h1><p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage customer orders</p></div>
        <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); fetchOrders(); }} className="px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700/50 text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500/30">
          <option value="">All Statuses</option>
          {ORDER_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      {orders.length === 0 && !loading ? <EmptyState icon={ShoppingBag} title="No orders yet" description="Orders will appear here when customers place them" /> : <DataTable columns={columns} data={orders} loading={loading} searchKeys={['_id', 'customer']} searchPlaceholder="Search orders..." onRowClick={(row) => navigate(`/admin/orders/${row._id}`)} exportFilename="orders" emptyIcon={ShoppingBag} emptyMessage="No orders found" />}
    </div>
  );
}
