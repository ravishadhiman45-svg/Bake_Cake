import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Edit2, Crown, Cake as CakeIcon } from 'lucide-react';
import Badge from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';
import { PageLoader } from '../../../components/ui/LoadingSpinner';
import { cakeService } from '../../../services/cakeService';
import { formatCurrency, formatDate } from '../../../utils/constants';

const MOCK_CAKE = { _id: '1', name: 'Chocolate Truffle', price: 2500, flavour: 'Chocolate', weight: '1kg', type: 'Birthday Cakes', isPremium: true, description: 'A rich chocolate truffle cake with layers of dark chocolate ganache and Belgian chocolate shavings. Perfect for birthdays and celebrations.', images: ['https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg'], videos: [], reviews: [{ _id: '1', user: 'Rahul S.', rating: 5, comment: 'Best chocolate cake ever!', date: '2025-01-12' }, { _id: '2', user: 'Priya M.', rating: 4, comment: 'Delicious but delivery was a bit late.', date: '2025-01-10' }], createdAt: '2025-01-10' };

export default function ViewCakePage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [cake, setCake] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCake = async () => {
      try { const res = await cakeService.getById(id); setCake(res.data?.cake || res.data); }
      catch { setCake(MOCK_CAKE); }
      finally { setLoading(false); }
    };
    fetchCake();
  }, [id]);

  if (loading) return <PageLoader />;
  if (!cake) return <p className="text-center text-gray-500 mt-12">Cake not found</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"><ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" /></button>
          <div>
            <div className="flex items-center gap-2"><h1 className="text-2xl font-bold text-gray-900 dark:text-white">{cake.name}</h1>{cake.isPremium && <Crown className="w-5 h-5 text-warning-500" />}</div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Created on {formatDate(cake.createdAt)}</p>
          </div>
        </div>
        <Button icon={Edit2} onClick={() => navigate(`/admin/cakes/edit/${id}`)}>Edit</Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700/50">
            <div className="aspect-video rounded-xl bg-gray-100 dark:bg-gray-700 mb-6 flex items-center justify-center overflow-hidden">
              {cake.images?.[0] ? <img src={cake.images[0]} alt={cake.name} className="w-full h-full object-cover" /> : <CakeIcon className="w-16 h-16 text-gray-300 dark:text-gray-600" />}
            </div>
            {cake.images?.length > 1 && <div className="flex gap-2 overflow-x-auto pb-2">{cake.images.map((img, i) => <img key={i} src={img} alt="" className="w-20 h-20 rounded-lg object-cover shrink-0 border border-gray-200 dark:border-gray-600" />)}</div>}
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700/50">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Description</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{cake.description}</p>
          </div>
          {cake.reviews?.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700/50">
              <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Reviews</h3>
              <div className="space-y-4">
                {cake.reviews.map((r) => (
                  <div key={r._id} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-700/30">
                    <div className="w-8 h-8 rounded-lg bg-primary-500/10 flex items-center justify-center text-primary-500 text-xs font-bold">{r.user?.[0] || 'U'}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between"><span className="text-sm font-medium text-gray-900 dark:text-white">{r.user}</span><div className="flex gap-0.5">{Array.from({ length: 5 }).map((_, i) => (<span key={i} className={`text-xs ${i < r.rating ? 'text-warning-500' : 'text-gray-300'}`}>&#9733;</span>))}</div></div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{r.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700/50">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Details</h3>
            <div className="space-y-3">
              {[{ label: 'Price', value: formatCurrency(cake.price) }, { label: 'Flavour', value: cake.flavour }, { label: 'Weight', value: cake.weight }, { label: 'Type', value: <Badge variant="primary">{cake.type}</Badge> }, { label: 'Premium', value: <Badge variant={cake.isPremium ? 'warning' : 'default'}>{cake.isPremium ? 'Yes' : 'No'}</Badge> }].map((item) => (
                <div key={item.label} className="flex items-center justify-between py-2 border-b border-gray-50 dark:border-gray-700/50 last:border-0"><span className="text-sm text-gray-500 dark:text-gray-400">{item.label}</span><span className="text-sm font-medium text-gray-900 dark:text-white">{item.value}</span></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
