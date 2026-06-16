import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Clock, CheckCircle2, Truck, XCircle, DollarSign, Users, Crown, Cake, Star, TrendingUp, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import StatCard from '../../../components/ui/StatCard';
import { CardSkeleton } from '../../../components/ui/Skeleton';
import { settingsService } from '../../../services/settingsService';
import { formatDate, formatCurrency } from '../../../utils/constants';
import Badge from '../../../components/ui/Badge';

const MOCK_STATS = { totalOrders: 2483, pendingOrders: 124, confirmedOrders: 89, deliveredOrders: 2105, cancelledOrders: 165, revenue: 485920, totalUsers: 1856, premiumUsers: 342, totalCakes: 156, totalReviews: 892 };
const MOCK_ORDERS = [
  { _id: '1', customer: 'Rahul Sharma', email: 'rahul@email.com', amount: 2500, status: 'Delivered', date: '2025-01-15', payment: 'Paid' },
  { _id: '2', customer: 'Priya Patel', email: 'priya@email.com', amount: 3200, status: 'Preparing', date: '2025-01-14', payment: 'Paid' },
  { _id: '3', customer: 'Amit Kumar', email: 'amit@email.com', amount: 1800, status: 'Pending', date: '2025-01-14', payment: 'Unpaid' },
  { _id: '4', customer: 'Sneha Reddy', email: 'sneha@email.com', amount: 4500, status: 'Out For Delivery', date: '2025-01-13', payment: 'Paid' },
  { _id: '5', customer: 'Vikram Singh', email: 'vikram@email.com', amount: 2100, status: 'Confirmed', date: '2025-01-13', payment: 'Paid' },
];
const MOCK_FEEDBACKS = [
  { _id: '1', name: 'Anjali Gupta', message: 'Amazing chocolate cake! Will order again.', date: '2025-01-15' },
  { _id: '2', name: 'Rohan Mehta', message: 'Delivery was late but cake was perfect.', date: '2025-01-14' },
  { _id: '3', name: 'Kavya Nair', message: 'Best red velvet cake in town!', date: '2025-01-13' },
];
const REVENUE_DATA = [{ month: 'Jul', value: 32000 }, { month: 'Aug', value: 45000 }, { month: 'Sep', value: 38000 }, { month: 'Oct', value: 52000 }, { month: 'Nov', value: 61000 }, { month: 'Dec', value: 78000 }, { month: 'Jan', value: 65000 }];
const ORDER_STATUS_DATA = [{ label: 'Delivered', value: 2105, color: '#22c55e' }, { label: 'Pending', value: 124, color: '#f59e0b' }, { label: 'Confirmed', value: 89, color: '#3b82f6' }, { label: 'Cancelled', value: 165, color: '#ef4444' }];
const statusVariant = { Pending: 'warning', Confirmed: 'blue', Preparing: 'primary', 'Out For Delivery': 'warning', Delivered: 'success', Cancelled: 'error' };

function MiniBarChart({ data }) {
  const max = Math.max(...data.map((d) => d.value));
  return (
    <div className="flex items-end gap-2 h-40">
      {data.map((d, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <motion.div initial={{ height: 0 }} animate={{ height: `${(d.value / max) * 100}%` }} transition={{ duration: 0.6, delay: i * 0.08 }} className="w-full rounded-t-lg bg-primary-500/80 hover:bg-primary-500 transition-colors min-h-1" />
          <span className="text-[10px] text-gray-400">{d.month}</span>
        </div>
      ))}
    </div>
  );
}

function DonutChart({ data }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  let accumulated = 0;
  return (
    <div className="flex items-center gap-6">
      <div className="relative w-32 h-32">
        <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
          {data.map((d, i) => {
            const pct = (d.value / total) * 100;
            const offset = accumulated;
            accumulated += pct;
            return <circle key={i} r="15.9" cx="18" cy="18" fill="none" stroke={d.color} strokeWidth="3.5" strokeDasharray={`${pct} ${100 - pct}`} strokeDashoffset={`${-offset}`} className="transition-all duration-500" />;
          })}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center"><span className="text-lg font-bold text-gray-900 dark:text-white">{total}</span></div>
      </div>
      <div className="space-y-2">
        {data.map((d, i) => (<div key={i} className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} /><span className="text-xs text-gray-600 dark:text-gray-400">{d.label}</span><span className="text-xs font-medium text-gray-900 dark:text-white ml-auto">{d.value}</span></div>))}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try { const res = await settingsService.getDashboardStats(); setStats(res.data); }
      catch { setStats(MOCK_STATS); }
      finally { setLoading(false); }
    };
    fetchStats();
  }, []);

  const s = stats || MOCK_STATS;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1><p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Overview of your bakery performance</p></div>
        <Link to="/admin/cakes/create" className="hidden sm:flex items-center gap-2 px-4 py-2 bg-primary-500 text-white text-sm font-medium rounded-xl hover:bg-primary-600 transition-colors shadow-sm shadow-primary-500/25"><Cake className="w-4 h-4" /> Add Cake</Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">{Array.from({ length: 10 }).map((_, i) => <CardSkeleton key={i} />)}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          <StatCard title="Total Orders" value={s.totalOrders.toLocaleString()} icon={ShoppingBag} color="primary" trend="up" trendValue="+12%" />
          <StatCard title="Pending Orders" value={s.pendingOrders} icon={Clock} color="warning" />
          <StatCard title="Confirmed" value={s.confirmedOrders} icon={CheckCircle2} color="blue" />
          <StatCard title="Delivered" value={s.deliveredOrders.toLocaleString()} icon={Truck} color="success" trend="up" trendValue="+8%" />
          <StatCard title="Cancelled" value={s.cancelledOrders} icon={XCircle} color="error" />
          <StatCard title="Revenue" value={formatCurrency(s.revenue)} icon={DollarSign} color="success" trend="up" trendValue="+23%" />
          <StatCard title="Total Users" value={s.totalUsers.toLocaleString()} icon={Users} color="blue" />
          <StatCard title="Premium Users" value={s.premiumUsers} icon={Crown} color="primary" />
          <StatCard title="Total Cakes" value={s.totalCakes} icon={Cake} color="warning" />
          <StatCard title="Total Reviews" value={s.totalReviews} icon={Star} color="primary" />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700/50">
          <div className="flex items-center justify-between mb-6"><h3 className="text-base font-semibold text-gray-900 dark:text-white">Revenue Overview</h3><div className="flex items-center gap-1 text-xs text-success-500 font-medium"><TrendingUp className="w-3 h-3" /> +23% vs last month</div></div>
          <MiniBarChart data={REVENUE_DATA} />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700/50"><h3 className="text-base font-semibold text-gray-900 dark:text-white mb-6">Order Status</h3><DonutChart data={ORDER_STATUS_DATA} /></motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700/50">
          <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-700"><h3 className="text-base font-semibold text-gray-900 dark:text-white">Latest Orders</h3><Link to="/admin/orders" className="flex items-center gap-1 text-xs text-primary-500 hover:text-primary-600 font-medium">View all <ArrowRight className="w-3 h-3" /></Link></div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead><tr className="border-b border-gray-100 dark:border-gray-700"><th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Customer</th><th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Amount</th><th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th><th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Payment</th></tr></thead>
              <tbody>
                {MOCK_ORDERS.map((order) => (
                  <tr key={order._id} className="border-b border-gray-50 dark:border-gray-700/50">
                    <td className="px-6 py-3"><p className="text-sm font-medium text-gray-900 dark:text-white">{order.customer}</p><p className="text-xs text-gray-400">{order.email}</p></td>
                    <td className="px-6 py-3 text-sm font-medium text-gray-900 dark:text-white">{formatCurrency(order.amount)}</td>
                    <td className="px-6 py-3"><Badge variant={statusVariant[order.status]}>{order.status}</Badge></td>
                    <td className="px-6 py-3"><Badge variant={order.payment === 'Paid' ? 'success' : 'warning'}>{order.payment}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700/50">
          <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-700"><h3 className="text-base font-semibold text-gray-900 dark:text-white">Recent Feedbacks</h3><Link to="/admin/feedbacks" className="flex items-center gap-1 text-xs text-primary-500 hover:text-primary-600 font-medium">View all <ArrowRight className="w-3 h-3" /></Link></div>
          <div className="p-4 space-y-3">{MOCK_FEEDBACKS.map((fb) => (<div key={fb._id} className="p-3 rounded-xl bg-gray-50 dark:bg-gray-700/30"><div className="flex items-center justify-between mb-1"><span className="text-sm font-medium text-gray-900 dark:text-white">{fb.name}</span><span className="text-xs text-gray-400">{formatDate(fb.date)}</span></div><p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">{fb.message}</p></div>))}</div>
        </motion.div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[{ label: 'Add Cake', to: '/admin/cakes/create', icon: Cake, color: 'bg-primary-500/10 text-primary-500' }, { label: 'View Orders', to: '/admin/orders', icon: ShoppingBag, color: 'bg-blue-500/10 text-blue-500' }, { label: 'Manage Reviews', to: '/admin/reviews', icon: Star, color: 'bg-warning-500/10 text-warning-500' }, { label: 'Settings', to: '/admin/settings', icon: DollarSign, color: 'bg-success-500/10 text-success-500' }].map((action) => (<Link key={action.label} to={action.to}><motion.div whileHover={{ y: -2 }} className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700/50 flex items-center gap-3 hover:shadow-md transition-shadow"><div className={`p-2.5 rounded-xl ${action.color}`}><action.icon className="w-5 h-5" /></div><span className="text-sm font-medium text-gray-700 dark:text-gray-300">{action.label}</span></motion.div></Link>))}
      </div>
    </div>
  );
}
