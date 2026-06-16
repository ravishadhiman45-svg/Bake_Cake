import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Package, User, MapPin, CreditCard, Clock, CheckCircle2, Truck, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { PageLoader } from '../../components/ui/LoadingSpinner';
import { orderService } from '../../services/orderService';
import { formatCurrency, formatDateTime, ORDER_STATUSES } from '../../utils/constants';

const MOCK_ORDER = {
  _id: 'ORD001', customer: { name: 'Rahul Sharma', email: 'rahul@email.com', phone: '9876543210' },
  address: '123 Main Street, Andheri West, Mumbai, Maharashtra 400058',
  products: [{ name: 'Chocolate Truffle Cake', qty: 1, price: 2500, image: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg' }, { name: 'Vanilla Cupcakes (6pc)', qty: 1, price: 600, image: '' }],
  totalAmount: 3100, status: 'Preparing', paymentStatus: 'Paid', paymentMethod: 'Razorpay', createdAt: '2025-01-15T10:30:00',
  timeline: [
    { status: 'Pending', date: '2025-01-15T10:30:00', completed: true },
    { status: 'Confirmed', date: '2025-01-15T10:45:00', completed: true },
    { status: 'Preparing', date: '2025-01-15T11:00:00', completed: true },
    { status: 'Out For Delivery', date: null, completed: false },
    { status: 'Delivered', date: null, completed: false },
  ],
};

const statusVariant = { Pending: 'warning', Confirmed: 'blue', Preparing: 'primary', 'Out For Delivery': 'warning', Delivered: 'success', Cancelled: 'error' };
const statusIcon = { Pending: Clock, Confirmed: CheckCircle2, Preparing: Package, 'Out For Delivery': Truck, Delivered: CheckCircle2, Cancelled: XCircle };

export default function OrderDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try { const res = await orderService.getById(id); setOrder(res.data?.order || res.data); }
      catch { setOrder(MOCK_ORDER); }
      finally { setLoading(false); }
    };
    fetch();
  }, [id]);

  const updateStatus = async (status) => {
    setUpdating(true);
    try { await orderService.updateStatus(id, status); setOrder((prev) => ({ ...prev, status })); toast.success(`Order status updated to ${status}`); }
    catch { toast.error('Failed to update status'); }
    finally { setUpdating(false); }
  };

  if (loading) return <PageLoader />;
  if (!order) return <p className="text-center text-gray-500 mt-12">Order not found</p>;

  const currentIdx = ORDER_STATUSES.indexOf(order.status);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"><ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" /></button>
          <div><h1 className="text-2xl font-bold text-gray-900 dark:text-white">Order {order._id}</h1><p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Placed on {formatDateTime(order.createdAt)}</p></div>
        </div>
        <Badge variant={statusVariant[order.status]} className="text-sm px-4 py-1.5">{order.status}</Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700/50">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Order Timeline</h3>
            <div className="relative">
              {order.timeline?.map((step, i) => {
                const Icon = statusIcon[step.status] || Package;
                return (
                  <div key={i} className="flex items-start gap-4 pb-6 last:pb-0">
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step.completed ? 'bg-primary-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-400'}`}><Icon className="w-4 h-4" /></div>
                      {i < order.timeline.length - 1 && <div className={`w-0.5 h-8 ${step.completed ? 'bg-primary-500' : 'bg-gray-200 dark:bg-gray-700'}`} />}
                    </div>
                    <div><p className={`text-sm font-medium ${step.completed ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`}>{step.status}</p>{step.date && <p className="text-xs text-gray-400 mt-0.5">{formatDateTime(step.date)}</p>}</div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700/50">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Products</h3>
            <div className="space-y-3">
              {order.products?.map((p, i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-gray-50 dark:bg-gray-700/30">
                  <div className="w-16 h-16 rounded-xl bg-gray-200 dark:bg-gray-600 flex items-center justify-center overflow-hidden shrink-0">{p.image ? <img src={p.image} alt={p.name} className="w-full h-full object-cover" /> : <Package className="w-6 h-6 text-gray-400" />}</div>
                  <div className="flex-1 min-w-0"><p className="text-sm font-medium text-gray-900 dark:text-white truncate">{p.name}</p><p className="text-xs text-gray-400">Qty: {p.qty}</p></div>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">{formatCurrency(p.price)}</span>
                </div>
              ))}
              <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700"><span className="text-sm font-semibold text-gray-900 dark:text-white">Total</span><span className="text-lg font-bold text-gray-900 dark:text-white">{formatCurrency(order.totalAmount)}</span></div>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700/50"><h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2"><User className="w-4 h-4" /> Customer</h3><div className="space-y-2"><p className="text-sm text-gray-900 dark:text-white font-medium">{order.customer?.name}</p><p className="text-sm text-gray-500 dark:text-gray-400">{order.customer?.email}</p><p className="text-sm text-gray-500 dark:text-gray-400">{order.customer?.phone}</p></div></div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700/50"><h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2"><MapPin className="w-4 h-4" /> Delivery Address</h3><p className="text-sm text-gray-600 dark:text-gray-400">{order.address}</p></div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700/50"><h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2"><CreditCard className="w-4 h-4" /> Payment</h3><div className="space-y-2"><div className="flex items-center justify-between"><span className="text-sm text-gray-500 dark:text-gray-400">Status</span><Badge variant={order.paymentStatus === 'Paid' ? 'success' : 'warning'}>{order.paymentStatus}</Badge></div><div className="flex items-center justify-between"><span className="text-sm text-gray-500 dark:text-gray-400">Method</span><span className="text-sm font-medium text-gray-900 dark:text-white">{order.paymentMethod || 'Online'}</span></div><div className="flex items-center justify-between"><span className="text-sm text-gray-500 dark:text-gray-400">Amount</span><span className="text-sm font-bold text-gray-900 dark:text-white">{formatCurrency(order.totalAmount)}</span></div></div></div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700/50"><h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Update Status</h3><div className="space-y-2">{ORDER_STATUSES.map((s) => (<Button key={s} variant={order.status === s ? 'primary' : 'outline'} size="sm" className="w-full justify-start" loading={updating && s === ORDER_STATUSES[currentIdx + 1]} disabled={ORDER_STATUSES.indexOf(s) <= currentIdx && s !== 'Cancelled'} onClick={() => updateStatus(s)}>{s}</Button>))}</div></div>
        </div>
      </div>
    </div>
  );
}
